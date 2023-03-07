export const calculateSince = (datetime: string) => {
  var tTime: any = new Date(datetime);
  var cTime: any = new Date();
  var sinceMin = Math.round((cTime - tTime) / 60000);
  if (sinceMin == 0) {
    var sinceSec = Math.round((cTime - tTime) / 1000);
    if (sinceSec < 10) var since = "less than 10 seconds";
    else if (sinceSec < 20) var since = "less than 20 seconds";
    else var since = "half a minute";
  } else if (sinceMin == 1) {
    var sinceSec = Math.round((cTime - tTime) / 1000);
    if (sinceSec == 30) var since = "half a minute";
    else if (sinceSec < 60) var since = "less than a minute";
    else var since = "1 minute";
  } else if (sinceMin < 45) var since = sinceMin + " minutes";
  else if (sinceMin > 44 && sinceMin < 60) var since = "about 1 hour";
  else if (sinceMin < 1440) {
    var sinceHr = Math.round(sinceMin / 60);
    if (sinceHr == 1) var since = "about 1 hour";
    else var since = "about " + sinceHr + " hours";
  } else if (sinceMin > 1439 && sinceMin < 2880) var since = "1 day";
  else {
    var sinceDay = Math.round(sinceMin / 1440);
    var since = sinceDay + " days";
  }
  return since;
};
