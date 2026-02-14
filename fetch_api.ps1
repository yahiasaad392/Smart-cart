$url = "https://documenter.gw.postman.com/api/collections/5709532/2s93JqTRWN?segregateAuth=true&versionTag=latest"
Invoke-WebRequest -Uri $url -OutFile "api_docs.json"
