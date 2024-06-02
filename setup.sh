#Build images
cd customer-client
docker build -t customer-client .

cd ../customer-facing-web-server
docker build -t customer-facing-web-server .

cd ../customer-manager
docker build -t customer-manager .

# minikube addons enable metrics-server

#Install helm chart
cd ../customer-stack 
rm Chart.lock
helm dependency update 
helm install customer-stack .

# Create local endpoint 
sleep 15
minikube service customer-client --url