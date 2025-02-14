kind create cluster --name cluster --config kind/cluster.yaml

kubectl config use-context kind-cluster
kubectl apply -f kind/metrics-server.yaml
kubectl label node cluster-control-plane node.kubernetes.io/exclude-from-external-load-balancers-

go install sigs.k8s.io/cloud-provider-kind@latest