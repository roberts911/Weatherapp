# Start od oficjalnego obrazu Node.js
FROM node:14
# Ustal katalog roboczy w kontenerze
WORKDIR /app
# Kopiuj pliki package.json i package-lock.json
COPY package*.json ./
# Zainstaluj wszystkie zależności
RUN npm install
# Kopiuj resztę kodu do katalogu roboczego
COPY . .
# Buduj aplikację
RUN npm run build
# Nasłuchuj na porcie 8000
EXPOSE 8000
# Uruchom aplikację
CMD ["npm", "start"]
