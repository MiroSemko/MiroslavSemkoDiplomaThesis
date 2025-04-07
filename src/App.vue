<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      app
      style="width: 66px;"
    >
      <!-- Profile at the top -->
        <v-list-item class="mt-2 mb-2">
          <template v-slot:prepend>
            <v-icon size="32" color="primary">mdi-rocket-launch</v-icon>
          </template>
        </v-list-item>


      <v-divider></v-divider>

      <!-- Middle Navigation Items -->
      <v-list density="compact" nav>
        <v-list-item
          title="Dashboard"
          value="dashboard"
          style="font-size: 18px;"
        >
          <template v-slot:prepend>
            <v-tooltip bottom>
              <template v-slot:activator="{ props }">
                <v-icon size="32" v-bind="props">mdi-view-dashboard</v-icon>
              </template>
              <span>Dashboard</span>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item
          title="Graphs"
          value="graphs"
          style="font-size: 18px;"
        >
          <template v-slot:prepend>
            <v-tooltip bottom>
              <template v-slot:activator="{ props }">
                <v-icon size="32" v-bind="props">mdi-chart-line</v-icon>
              </template>
              <span>Graphs</span>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-list-item
          title="Notifications"
          value="notifications"
          style="font-size: 18px;"
        >
          <template v-slot:prepend>
            <v-tooltip bottom>
              <template v-slot:activator="{ props }">
                <v-icon size="32" v-bind="props">mdi-bell</v-icon>
              </template>
              <span>Notifications</span>
            </v-tooltip>
          </template>
        </v-list-item>
      </v-list>


      <!-- Bottom Navigation Items -->
      <template v-slot:append>
        <v-list density="compact" nav>
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ props }">
                  <v-icon
                    size="32"
                    v-bind="props"
                    @click="toggleTheme"
                  >
                    {{ isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}
                  </v-icon>
                </template>
                <span>{{ isDark ? 'Switch To Light Mode' : 'Switch To Dark Mode' }}</span>
              </v-tooltip>
            </template>
          </v-list-item>
          <v-list-item
            title="Settings"
            value="settings"
            style="font-size: 18px;"
            to="/settings"
          >
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ props }">
                  <v-icon size="32" v-bind="props" @click="showSettingsModal = true">mdi-cog</v-icon>

                </template>
                <span>Settings</span>
              </v-tooltip>
            </template>
          </v-list-item>
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ props }">
                  <v-avatar size="32" v-bind="props">
                    <img 
                      src="https://randomuser.me/api/portraits/men/85.jpg" 
                      alt="Profile Picture" 
                      style="object-fit: cover; width: 100%; height: 100%;" 
                    />
                  </v-avatar>
                </template>
                <span>Profile</span> <!-- Tooltip text -->
              </v-tooltip>
            </template>
          </v-list-item>

        </v-list>
      </template>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pt-5 pl-8 pb-0 mb-0">
        <v-row>
          <!-- Left Column -->
          <v-col cols="8">
            <!-- Action Buttons -->
            <v-row>
              <v-col cols="3">
                <v-card class="mb-3" style="height: 300px;">
                  <v-card-title>Action Buttons</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col
                        v-for="(value, key) in formattedData('I_Button_')"
                        :key="key"
                        cols="12"
                        class="d-flex align-items-center"
                      >
                        <div style="font-size: 1.1rem; font-weight: bold; margin-right: auto; display: flex; align-items: center;">
                          {{ key }}
                        </div>
                        <v-btn
                          :color="value ? '#f87979' : '#64af68'"
                          class="ma-0"
                          style="width: 60px; height: 60px; border-radius: 50%;"
                          @click="sendButtonData(key,value)"
                        >
                          <v-icon style="font-size: 61px;">
                            <!-- {{ value ? 'mdi-stop-circle-outline' : 'mdi-play-circle-outline' }} -->
                            {{
                              key.toLowerCase() === "start"
                                ? "mdi-play-circle-outline"
                                : key.toLowerCase() === "stop" || key.toLowerCase() === "emergency stop"
                                ? "mdi-stop-circle-outline"
                                : "mdi-play-circle-outline"
                            }}
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- Counter Status -->
              <v-col cols="9">
                <v-card class="mb-4" style="height: 300px;">
                  <v-card-title>Counter Status</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col
                        :cols="Math.floor(12 / columnCount)"
                        v-for="(value, key) in formattedData('O_Counter_')"
                        :key="key"
                      >
                        <v-card
                          :style="{
                            height: dynamicCardHeight + 'px',
                            display: 'flex',
                            flexDirection: dynamicCardHeight < 100 ? 'row' : 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }"
                        >
                          <span style="font-size: 2.8rem; font-weight: bold;">
                            {{ value }}
                          </span>
                          <span style="margin-top: 8px; font-size: 1.05rem">
                            {{ key }}
                          </span>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>


            </v-row>

            <!-- Graphs Side by Side -->
            <v-row>
              <v-col cols="7">
                <v-card height="365px" class="mb-4">
                  <v-card-title>Graph Left Lane</v-card-title>
                  <v-card-text style="height: 100%;">
                    <div style="height: 150px;">
                      <CounterChart :data-points="filteredData('O_Counter_Left')" />
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="5">
                <v-card height="365px" class="mb-4">
                  <v-card-title>Graph Colors</v-card-title>
                  <v-card-text style="height: 100%;">
                    <div style="height: 150px;">
                      <!-- <PieChart :data-points="formattedData('O_Counter')" /> -->
                      <PieChart :data-points="Object.fromEntries(Object.entries(formattedData('O_Counter')).slice(-3))" />
                      <!-- only last 3 items of formattedData('O_Counter') so green blue and other -->
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <!-- Right Column -->
          <v-col cols="4">
            <v-card style="max-height: 705px; overflow-y: auto;">
              <v-card-title>Details</v-card-title>
              <v-card-text>
                <v-row>
                  <!-- Outputs Section -->
                  <v-col cols="6">
                    <v-card>
                      <v-card-title>Outputs</v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col
                            v-for="(value, key) in formattedData('O_', ['O_Counter_'])"
                            :key="key"
                            cols="12"
                          >
                            <v-tooltip bottom>
                              <template v-slot:activator="{ props }">
                                <v-card v-bind="props">
                                  <v-card-title>{{ key }}</v-card-title>
                                  <v-card-text>
                                    <v-chip :color="value ? 'green' : 'red'" dark>
                                      {{ value ? 'True' : 'False' }}
                                    </v-chip>
                                  </v-card-text>
                                </v-card>
                              </template>
                              <span>{{ key }}</span>
                            </v-tooltip>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>


                  <!-- Inputs Section -->
                  <v-col cols="6">
                    <v-card>
                      <v-card-title>Inputs</v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col
                            v-for="(value, key) in formattedData('I_', ['I_Button_'])"
                            :key="key"
                            cols="12"
                          >
                            <v-tooltip bottom>
                              <template v-slot:activator="{ props }">
                                <v-card v-bind="props">
                                  <v-card-title>{{ key }}</v-card-title>
                                  <v-card-text>
                                    <v-chip :color="value ? 'green' : 'red'" dark>
                                      {{ value ? 'True' : 'False' }}
                                    </v-chip>
                                  </v-card-text>
                                </v-card>
                              </template>
                              <span>{{ key }}</span>
                            </v-tooltip>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>

                </v-row>
              </v-card-text>
            </v-card>


          </v-col>
        </v-row>
      </v-container>

    </v-main>

    <v-dialog v-model="showSettingsModal" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">MQTT Settings</span>
        </v-card-title>

        <v-card-text>
          <v-text-field label="MQTT Topic" v-model="mqttSettings.topic" />
          <v-text-field label="MQTT Back Topic" v-model="mqttSettings.returnTopic" />
          <v-text-field label="Username" v-model="mqttSettings.username" />
          <v-text-field
            label="Password"
            v-model="mqttSettings.password"
            type="password"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="applySettings">Save</v-btn>
          <v-btn text @click="showSettingsModal = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import mqtt from "mqtt-browser";
import { mqttConfig } from "./mqttConfig";
import { useTheme } from 'vuetify'
import { computed } from 'vue'; 

import CounterChart from "@/components/CounterChart.vue";
import PieChart from "@/components/PieChart.vue";

export default {
  components: {
    CounterChart,
    PieChart
  },
  setup() {
    const theme = useTheme();

    const isDark = computed(() => theme.global.name.value === 'dark');

    const toggleTheme = () => {
      theme.global.name.value = isDark.value ? 'light' : 'dark';
    };

    return {
      isDark,
      toggleTheme,
    };
  },
  data() {
    return {
      drawer: true,
      rail: true,
      client: null,
      topic: "mqtt",
      returnTopic: "mqttback",
      statusData: null,
      showSettingsModal: false,
      mqttSettings: {
        topic: "mqtt",
        returnTopic: "mqttback",
        username: mqttConfig.username,
        password: mqttConfig.password,
      },
    };
  },
  mounted() {
      this.connectToMQTT();
    },
    computed: {
      columnCount() {
        const totalSensors = Object.keys(this.formattedData("O_Counter_")).length;

        if (totalSensors === 3) return 3; // 3x1 grid
        if (totalSensors === 4) return 2; // 2x2 grid
        if (totalSensors <= 6) return 3; // 3x2 grid
        if (totalSensors <= 8) return 4; // 4x2 grid
        if (totalSensors <= 12) return 4; // 4x3 grid
        return 6; // More than 12 sensors → 6 columns
      },
      rowCount() {
        const totalSensors = Object.keys(this.formattedData("O_Counter_")).length;
        return Math.ceil(totalSensors / this.columnCount);
      },
      dynamicCardHeight() {
        if (this.rowCount === 1) return 220; // If only 1 row, increase height
        if (this.rowCount === 3) return 60; // If exactly 3 rows, decrease height
        return 100; // Default height
      }
    },


  methods: {
    connectToMQTT() {
      const options = {
        username: this.mqttSettings.username,
        password: this.mqttSettings.password,
      };

      this.client = mqtt.connect(mqttConfig.url, options);

      this.client.on("connect", () => {
        console.log("Connected to MQTT broker");
        this.subscribe();
      });

      this.client.on("error", (err) => {
        console.error("MQTT Connection Error:", err);
      });

      this.client.on("message", (topic, message) => {
        try {
          this.statusData = JSON.parse(message.toString());
        } catch (err) {
          console.error("Failed to parse message:", err);
        }
      });
    },
    subscribe() {
      if (this.topic) {
        this.client.subscribe(this.topic, (err) => {
          if (!err) {
            console.log(`Subscribed to topic: ${this.topic}`);
          }
        });
      }
    },  
      sendButtonData(action, value) {
      const message = {
        action: action,
        value: value
      };

      if (this.client && this.client.connected) {
        this.client.publish(this.returnTopic, JSON.stringify(message), { qos: 0, retain: false }, (err) => {
          if (err) {
            console.error("MQTT Publish Error:", err);
          } else {
            console.log(`MQTT Message Sent: ${JSON.stringify(message)}`);
          }
        });
      } else {
        console.error("MQTT client is not connected");
      }
    },

    filteredData(prefix, exclude = []) {
      if (!this.statusData) return {};
      return Object.fromEntries(
        Object.entries(this.statusData).filter(
          ([key]) =>
            key.startsWith(prefix) && !exclude.some((ex) => key.startsWith(ex))
        )
      );
    },
    formattedData(prefix, exclude = []) {
      const data = this.filteredData(prefix, exclude);
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key
            .replace(/^O_|^I_/, "") // Remove initial "O_" or "I_"
            .replace(/Button|Counter/g, "") // Remove "Button" or "Counter"
            .replace(/_/g, " ") // Replace all underscores with spaces
            .trim(), // Trim any extra spaces
          value,
        ])
      );
    },
    applySettings() {
      if (this.client) {
        this.client.end();
      }

      this.topic = this.mqttSettings.topic;
      this.returnTopic = this.mqttSettings.returnTopic;
      this.connectToMQTT();
      this.showSettingsModal = false;
    },


  },
};
</script>
