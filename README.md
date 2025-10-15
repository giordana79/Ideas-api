## Comandi per creare il progetto ed installare le dipendenze:

- mkdir ideas-api && cd ideas-api

- npm init -y

- npm install express mongoose cors dotenv

- - 1 npm install
    ◦ Dice a Node.js di installare i pacchetti specificati nella cartella del progetto e aggiungerli al file package.json (se esiste).
    2 Pacchetti installati:
    • express → Framework per creare server web in Node.js.
    • mongoose → Libreria per interagire con MongoDB usando schemi e modelli.
    • cors → Permette richieste tra domini diversi (utile per frontend separati dal backend).
    • dotenv → Gestione delle variabili d’ambiente da file .env, come password e chiavi API.

- npm install -D nodemon

- - npm install
    • Come prima, dice a Node.js di installare un pacchetto nel progetto.

2. -D (o --save-dev)
   • Sta per “development dependency”.
   • Significa che il pacchetto viene installato solo per lo sviluppo, non per la produzione.
   • Nel file package.json, apparirà sotto "devDependencies" invece che "dependencies".
3. nodemon
   • È un tool che monitora i file del tuo progetto e riavvia automaticamente il server quando rileva modifiche.
   • Utile durante lo sviluppo, così non devi fermare e riavviare manualmente il server ogni volta che cambi il codice.

Comandi per avviare il progetto:

- npm install
- npm run dev
