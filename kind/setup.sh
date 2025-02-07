kind create cluster --name cluster --config kind/cluster.yaml
kubectl apply -f kind/metrics-server.yaml