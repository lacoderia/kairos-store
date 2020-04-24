# kairos-store

This web app allows user to have access to their progress inside the company.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This repository contains a react app.

### Installing

1. Clone this repository
2. Install node dependencies as user
```
npm install
```

## Running

1. Run the development build script on cli
```
npm run build:dev
```
2. Open `http://localhost:9001/` on a browser

## Deployment as single app

Steps to follow to deploy this on a live system:

1. Uncomment the production environment url in `constants.js` file

constants.js
```
// export const API_ROOT
// export const CONTACT_EMAIL
// export const OMEIN_STORE_URL
// export const PRANA_STORE_URL
```

2. Comment out openpay sandbox

3. Run the production build script on cli
```
npm run build:prod
```
4. Update the `index.html` file
Uncomment the link tag and update the file hash (~index.0346ad90b16157642a3a.css~)
```
<link rel="stylesheet" href="/dist/css/index.<new-hash>.css">
```
Uncomment the script tag and update the file hash (~index.0346ad90b16157642a3a.js~)
```
<script src="/dist/js/index.<new-hash>.js"></script>
```
Comment the unused script tag
```
<!-- <script src="/js/index.js"></script> -->
```
5. Create a bundle with with the following structure and upload it to the deployment server

```
|-- kairos-react
    |-- css
        |-- index.css
    |-- dist 
        |-- css
        |-- js
    |-- images
    |-- index.html
```

## Deployment as composite app

1. Build each app separately
```
npm run build:prod
```
2. Create a bundle with with the following structure and upload it to the deployment server

```
|-- kairos
    |-- css
        |-- index.css
    |-- dist 
        |-- css
            |-- index.<hash>.css 
            |-- store.<hash>.css
        |-- js
            |-- index.<hash>.js 
            |-- store.<hash>.js
    |-- docs
    |-- images
    |-- index.html
    |-- store.html
```
