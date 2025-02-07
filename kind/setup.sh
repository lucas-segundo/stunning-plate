kind create cluster --name cluster --config kind/cluster.yaml
kubectl config use-context kind-cluster
kubectl apply -f kind/metrics-server.yaml