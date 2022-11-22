import { IDeviceService } from "./types";

export default class DeviceService implements IDeviceService {
  readonly frequencies: number[];
  private currentFrequency: number;
  private previousFrequencies: number[];

  constructor(frequencies: number[]) {
    this.frequencies = frequencies;
    this.previousFrequencies = [0];
    this.currentFrequency = 0;
  }

  findCalibratedFrequency(): number {
    this.frequencies.forEach((freq) => {
      this.addFrequency(freq);
    });

    const res = this.currentFrequency;
    console.log("Device calibrated to frequency: ", res);
    this.resetState();

    return res;
  }

  findTreasure(): number {
    let i: number;
    let treasureFound = undefined;
    console.log("Looking for treasure location..");

    while (!treasureFound) {
      for (i = 0; i < this.frequencies.length; i++) {
        const newFrequency = this.currentFrequency + this.frequencies[i];
        const res = this.previousFrequencies.find((e) => e == newFrequency);

        if (res != undefined) {
          treasureFound = res;
          break;
        }
        this.addFrequency(this.frequencies[i]);
      }
    }
    console.log("Treasure located at: ", treasureFound);
    this.resetState();

    return treasureFound;
  }

  private addFrequency(freq: number) {
    this.previousFrequencies.push(this.currentFrequency + freq);
    this.currentFrequency += freq;
  }

  private resetState() {
    this.previousFrequencies = [0];
    this.currentFrequency = 0;
  }
}
