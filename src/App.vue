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
          <v-list-item
            title="Settings"
            value="settings"
            style="font-size: 18px;"
          >
            <template v-slot:prepend>
              <v-tooltip bottom>
                <template v-slot:activator="{ props }">
                  <v-icon size="32" v-bind="props">mdi-cog</v-icon>
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
      <v-container fluid class="pa-6 pl-8 pb-0">
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
                        <div style="font-size: 1rem; font-weight: bold; margin-right: auto; display: flex; align-items: center;">
                          {{ key }}
                        </div>
                        <v-btn
                          :color="value ? '#f87979' : '#64af68'"
                          class="ma-0"
                          style="width: 50px; height: 60px; border-radius: 50%;"
                        >
                          <v-icon style="font-size: 61px;">
                            {{ value ? 'mdi-stop-circle-outline' : 'mdi-play-circle-outline' }}
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
                        cols="4"
                        v-for="(value, key) in formattedData('O_Counter_')"
                        :key="key"
                      >
                        <v-card
                          style="
                            height: 100px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                          "
                        >
                          <span style="font-size: 2.8rem; font-weight: bold;">
                            {{ value }}
                          </span>
                          <span style="margin-top: 8px; font-size: 1.05rem">{{ key }}</span>
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
                <v-card height="340px" class="mb-4">
                  <v-card-title>Graph Left Lane</v-card-title>
                  <v-card-text style="height: 100%;">
                    <div style="height: 150px;">
                      <CounterChart :data-points="filteredData('O_Counter_Left')" />
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="5">
                <v-card height="340px" class="mb-4">
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
            <v-card style="max-height: 680px; overflow-y: auto;">
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
  </v-app>
</template>

<script>
import mqtt from "mqtt-browser";
import { mqttConfig } from "./mqttConfig";

import CounterChart from "@/components/CounterChart.vue";
import PieChart from "@/components/PieChart.vue";

export default {
  components: {
    CounterChart,
    PieChart
  },
  data() {
    return {
      drawer: true,
      rail: true,
      client: null,
      topic: "mqtt",
      statusData: null,
    };
  },
  mounted() {
    const options = {
      username: mqttConfig.username,
      password: mqttConfig.password,
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
  methods: {
    subscribe() {
      if (this.topic) {
        this.client.subscribe(this.topic, (err) => {
          if (!err) {
            console.log(`Subscribed to topic: ${this.topic}`);
          }
        });
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
    }

  },
};
</script>
