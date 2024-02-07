var url = window.location.href.split("/").slice(0, -1).join("/");

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
  var all = {};
  for (let index = 0; index < data.length; index++) {
    const element = data[index]["fields"];
    if (all[element["卷"]] == null) {
      all[element["卷"]] = [element["章"]];
    } else {
      all[element["卷"]].push(element["章"]);
    }
  }
  var list = "";
  for (const [key, value] of Object.entries(all)) {
    list +=
      '<p class="rollname" onclick="change($(this).index())">' +
      key +
      '</p>\n<ul class="roll">';
    for (let index = 0; index < all[key].length; index++) {
      const element = all[key][index];
      list +=
        '<li class="page"><a class="name" href="' +
        url +
        "/index.html?page=" +
        element +
        "&roll=" +
        key +
        '">' +
        element +
        "</a></li>";
    }
    list += "</ul>";
    document.getElementById("content").innerHTML = list;
  }
};

function change(i) {
  i /= 2
  if (
    document.getElementsByClassName("roll")[i].style.display == "flex"
  ) {
    document.getElementsByClassName("roll")[i].style.display = "none";
    document.getElementsByClassName("rollname")[i].className = "rollname nh";
  } else {
    document.getElementsByClassName("roll")[i].style.display = "flex";
    document.getElementsByClassName("rollname")[i].className = "rollname";
  }
}
