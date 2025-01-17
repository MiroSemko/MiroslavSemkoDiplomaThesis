<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        app
        @click="rail = false"
      >
        <!-- Profile at the top -->
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Middle Navigation Items -->
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"></v-list-item>
          <v-list-item prepend-icon="mdi-bell" title="Notifications" value="notifications"></v-list-item>
          <v-list-item prepend-icon="mdi-cog" title="Settings" value="settings"></v-list-item>
        </v-list>
      </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <!-- Make the container fluid and remove default padding -->
      <v-container fluid class="pa-6">
        <!-- Two Columns Layout -->
        <v-row>
          <!-- Left Column (2/3) -->
          <v-col cols="8">
            <!-- First Row -->
            <v-row>
              <v-col cols="6">
                <v-card class="mb-4" style="height: 300px;">
                  <v-card-title>Action Buttons</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col
                        v-for="(value, key) in filteredData('I_Button_')"
                        :key="key"
                        cols="12"
                      >
                        <v-btn
                          :color="value ? 'success' : 'error'"
                          class="ma-2"
                          style="width: 100%; height: 50px;"
                        >
                          {{ key }}: {{ value ? 'On' : 'Off' }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="6">
                <v-card class="mb-4" style="height: 300px;">
                  <v-card-title>Counter Status</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col
                        cols="4"
                        v-for="(value, key) in filteredData('O_Counter_')"
                        :key="key"
                      >
                        <v-card
                          style="
                            height: 150px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                          "
                        >
                          <span style="font-size: 2.5em; font-weight: bold;">
                            {{ value }}
                          </span>
                          <span style="margin-top: 10px;">{{ key }}</span>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Graph Rows -->
            <v-row>
              <v-col>
                <v-card height="200px" class="mb-4">
                  <v-card-title>Graph Placeholder 1</v-card-title>
                  <v-card-text style="height: 100%;">
                    <!-- Provide the object of counters to the chart -->
                    <div style="height: 150px;">
                      <!-- <CounterChart :data-points="filteredData('O_Counter_')" /> -->
                      <!-- <CounterChart :data-points="{ O_Counter_1: 10, O_Counter_2: 20, O_Counter_3: 5 }"/> -->
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-card height="200px">
                  <v-card-title>Graph Placeholder 2</v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-col>

          <!-- Right Column (1/3) -->
          <v-col cols="4">
            <v-card style="height: 100%; overflow-y: auto;">
              <v-card-title>Details and Other Inputs/Outputs</v-card-title>
              <v-card-text>
                <v-row>
                  <!-- Other Inputs -->
                  <v-col cols="6">
                    <v-card>
                      <v-card-title>Other Inputs</v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col
                            v-for="(value, key) in filteredData('I_', ['I_Button_'])"
                            :key="key"
                            cols="12"
                          >
                            <v-card>
                              <v-card-title>{{ key }}</v-card-title>
                              <v-card-text>
                                <v-chip
                                  :color="value ? 'green' : 'red'"
                                  dark
                                >
                                  {{ value ? 'True' : 'False' }}
                                </v-chip>
                              </v-card-text>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <!-- Outputs -->
                  <v-col cols="6">
                    <v-card>
                      <v-card-title>Outputs</v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col
                            v-for="(value, key) in filteredData('O_', ['O_Counter_'])"
                            :key="key"
                            cols="12"
                          >
                            <v-card>
                              <v-card-title>{{ key }}</v-card-title>
                              <v-card-text>
                                <v-chip
                                  :color="value ? 'green' : 'red'"
                                  dark
                                >
                                  {{ value ? 'True' : 'False' }}
                                </v-chip>
                              </v-card-text>
                            </v-card>
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
import mqtt from 'mqtt-browser';
import { mqttConfig } from './mqttConfig';

// import CounterChart from '@/components/CounterChart.vue';

export default {
  // components: {
  //   CounterChart,
  // },
  data() {
    return {
      drawer: true,
      rail: true,
      client: null,
      topic: 'mqtt', // Default topic
      statusData: null, // Holds the parsed JSON data
    };
  },
  mounted() {
    const options = {
      username: mqttConfig.username,
      password: mqttConfig.password,
    };

    this.client = mqtt.connect(mqttConfig.url, options);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.subscribe(); // Automatically subscribe to default topic
    });

    this.client.on('error', (err) => {
      console.error('MQTT Connection Error:', err);
    });

    this.client.on('message', (topic, message) => {
      console.log('Message received:', message.toString());
      try {
        this.statusData = JSON.parse(message.toString());
      } catch (err) {
        console.error('Failed to parse message:', err);
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
  },
};
</script>