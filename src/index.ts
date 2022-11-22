import fs from "fs";
import * as path from "path";
import { DeviceService } from "./services";

const localPath = "../assets/input.txt";

//read from .txt
const file = path.resolve(__dirname, localPath);
const res = fs.readFileSync(file).toString().split("\n");
const frequencies = res.map((e) => parseInt(e));

const deviceService = new DeviceService(frequencies);
const frequency = deviceService.findCalibratedFrequency();
const treasure = deviceService.findTreasure();
