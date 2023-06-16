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
# Nasłuchuj na porcie 9000
EXPOSE 9000
# Uruchom aplikację
CMD ["npm", "start"]
