kubectl apply -f https://raw.githubusercontent.com/nginx/kubernetes-ingress/v4.0.1/deploy/crds.yaml

helm install nginx-ingress oci://ghcr.io/nginx/charts/nginx-ingress --version 2.0.1 --namespace nginx-ingress --create-namespace