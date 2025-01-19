## hontokun

## Project 
- vue
- pinia

## Summary

探偵のホントくんといっしょにクイズでフェイクニュースを見破れ！

詳しくはこちらへ！



## Project setup

### Container Information
```
make ps
```

### Building Containers
```
make build
```

### Launching Containers
```
make up
```

### Stop Container
```
make down
```

### Package Install
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Kubernetes Install
helm repo add and install
```
$ helm repo add hontokun https://kouxi08.github.io/Hontokun-frontend/
$ helm install hontokun hontokun/hontokun --create-namespace --namespace hontokun
```