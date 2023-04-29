import * as fs from "node:fs";

type IOperation = "subtract" | "add";

function modifyTime(timeString: string, amount: number, operation: IOperation) {
  const timeParts = timeString.split(":");
  const hours = parseFloat(timeParts[0]);
  const minutes = parseFloat(timeParts[1]);
  const seconds = parseFloat(timeParts[2]);

  let newHours = hours;
  let newMinutes = minutes;
  let newSeconds = seconds;
  let hourInSeconds = hours * 60 * 60;
  let minuteInSeconds = minutes * 60;
  let totalInSeconds = hourInSeconds + minuteInSeconds + seconds;

  switch (operation) {
    case "subtract":
      totalInSeconds -= amount;
      break;
    case "add":
      totalInSeconds += amount;
      break;
    default:
      throw new Error("Invalid type argument");
  }

  newHours = Math.floor(totalInSeconds / 60 / 60);
  hourInSeconds = newHours * 60 * 60;
  newMinutes = Math.floor((totalInSeconds - hourInSeconds) / 60);
  minuteInSeconds = newMinutes * 60;
  newSeconds = totalInSeconds - (hourInSeconds + minuteInSeconds);

  if (newSeconds >= 60) {
    const extraMinutes = Math.floor(newSeconds / 60);
    newSeconds %= 60;
    newMinutes += extraMinutes;
  } else if (newSeconds < 0) {
    newMinutes -= 1;
    newSeconds += 60;
  }

  if (newMinutes >= 60) {
    const extraHours = Math.floor(newMinutes / 60);
    newMinutes %= 60;
    newHours += extraHours;
  } else if (newMinutes < 0) {
    newHours -= 1;
    newMinutes += 60;
  }

  const newTimeParts = [
    newHours.toString().padStart(2, "0"),
    newMinutes.toString().padStart(2, "0"),
    newSeconds
      .toFixed(3)
      .split(".")
      .map((str, i) => (i === 0 ? str.padStart(2, "0") : str))
      .join("."),
  ];

  return newTimeParts.join(":");
}

const args = process.argv.slice(2);
const srtPath = args[0];
const duration = args[1];
const type = args[2] as IOperation;

fs.readFile(srtPath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Mendapatkan array dari teks asli
  let array: string[] = data.match(/\d{2}:\d{2}:\d{2},\d{3}/g) as any;

  // Melakukan perubahan pada nilai-nilai dalam array
  let updatedArray = array.map((value) => {
    const converted = value.replace(",", ".");
    return modifyTime(converted, Number(duration), type).replace(".", ",");
  });

  // Mengganti nilai teks asli dengan string yang sudah diperbarui
  data = data.replace(/\d{2}:\d{2}:\d{2},\d{3}/g, () => {
    return updatedArray.shift() as string;
  });

  fs.writeFile(srtPath, data, (err) => {
    if (err) {
      console.log(err);
    }
  });
});
