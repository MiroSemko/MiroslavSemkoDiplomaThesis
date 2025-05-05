# PLC Control Desktop Application – Miroslav Semko

This repository contains the code for a desktop application that serves as a visualization and control interface for an automated system using CODESYS, Factory I/O, Node-RED, and HiveMQ Cloud.

## ⚙️ Software Requirements

To run this system, the following software must be installed:

- **CODESYS** v3.5 SP16 Patch 7
- **Factory I/O** v2.5.5
- **Node.js** v18.17.1
- **NPM** v9.6.7
- **Node-RED** v4.0.5

---

## 🚦 PLC Setup in CODESYS

1. Launch **CODESYS** and **CODESYS Control Win SysTray x64**.
2. In the Windows system tray, right-click on the SysTray icon and select `Start PLC`.
3. Open your CODESYS project.
4. Go to `Symbols Configuration`, click `Build`.
5. Connect to the PLC: `Online > Login`.
6. Start the PLC program: `Debug > Start`.

---

## 🏭 Running Factory I/O

1. Launch **Factory I/O** and open your desired project.
2. Navigate to `File > Driver > Configuration` and select **OPC Client DA/UA**.
3. Click `Browse Servers` and choose your OPC UA server.
4. Click `Browse`, then map Factory I/O variables to OPC UA variables (e.g., `Start`, `Sensor1`, `Actuator1`).
5. Start the simulation by clicking the `Play` button.

---

## 🌐 Running Node-RED and Connecting to HiveMQ Cloud

1. Open PowerShell and run:
   ```bash
   node-red
   ```
2. Open your browser and navigate to [http://localhost:1880](http://localhost:1880).
3. Import your Node-RED flow from a file: `Import > File`.
4. Update the OPC UA Client nodes with your local OPC UA server address.
5. Create an account on [HiveMQ Cloud](https://www.hivemq.com/mqtt-cloud-broker/).
6. Set up a cluster and retrieve your MQTT connection credentials.
7. In Node-RED, configure the MQTT connection:
   - **Host:** `your-cluster.s1.eu.hivemq.cloud`
   - **Port:** `8883` (TLS)
   - **Username/Password:** from your HiveMQ account
   - **TLS encryption:** enabled
8. Click `Deploy` to start the Node-RED flow.
9. (Optional) Test the connection using the HiveMQ Web Client.

---

## 💻 Running the Desktop Application

### Option 1: Production (Distributed) Version

After building the application (see Packaging below), navigate to the `dist` folder:

- Run `dist/win-unpacked/MiroslavSemkoDP.exe` for quick testing (no installation).
- Or run `dist/MiroslavSemkoDP1.0.0.exe` to install the application on Windows.

> We recommend using the installer for end users. Use the unpacked `.exe` for development or fast access.

### Option 2: Development Version

Run the app in development mode:

```bash
npm install        # install dependencies
npm run start      # launch Electron
npm run dev        # in another terminal: launch Vite frontend
```

Electron will connect to the local dev server (Vite) with hot module replacement enabled.

---

## 📦 Packaging

To build the production-ready application, simply run:

```bash
npm run build
```

This will:
1. Build the Vue application using Vite (`npm run build:vue`)
2. Package the application for Windows using Electron Builder

Output files (installer and unpacked executable) will be located in the `dist` directory.

---

## 🧠 About

This project is part of Miroslav Semko’s diploma thesis. It integrates real-time industrial automation components with a modern desktop interface built using Electron and Vue.
