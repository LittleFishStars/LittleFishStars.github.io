function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return decodeURI(pair[1]);
    }
  }
  return false;
}

const page = getQueryVariable("page");
const roll = getQueryVariable("roll");
console.log("page:", page, "roll:", roll);

const Http = new XMLHttpRequest();
const vikaUrl =
  "https://api.vika.cn/fusion/v1/datasheets/dstalobGGTjwl2Bwi7/records?viewId=viwf2zzPNkeWt&fieldKey=name";
Http.open("GET", vikaUrl);
Http.setRequestHeader("Authorization", "Bearer uskplmojCNMk5OHuDNcfxXZ");
Http.send();

Http.onreadystatechange = (e) => {
  const jtext = JSON.parse(Http.responseText);
  console.log(jtext);
  const data = jtext["data"]["records"];
  for (let index = 0; index < data.length; index++) {
    const element = data[index]["fields"];
    if (element["卷"] == roll && element["章"] == page) {
      var content =
        "<p>" +
        element["内容"].split(/[(\r\n)\r\n]+/).join("</p>\n<p>") +
        "</p>";
      document.getElementById("content").innerHTML = content;
      document.getElementById("page").innerText = page;
      document.getElementById("roll").innerText = roll;
      const last = element["上一章"];
      const next = element["下一章"];
      for (let index = 0; index < data.length; index++) {
        const element_ = data[index];
        const url = window.location.href.split("?")[0];
        if ((element_["recordId"] == last)) {
          lasturl =
            url +
            "?page=" +
            element_["fields"]["章"] +
            "&roll=" +
            element_["fields"]["卷"];
          document.getElementById("last").href = lasturl;
        }
        if ((element_["recordId"] == next)) {
          nexturl =
            url +
            "?page=" +
            element_["fields"]["章"] +
            "&roll=" +
            element_["fields"]["卷"];
          document.getElementById("next").href = nexturl;
        }
      }
    }
  }
};
