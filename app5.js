"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


// アプリ1: 文明一覧システム
let civilizations = [
  { id: 1, name: "メソポタミア文明", river: "チグリス・ユーフラテス川", feature: "楔形文字、ハンムラビ法典", image: "/public/images/civilization/mesopota.jpg" },
  { id: 2, name: "エジプト文明", river: "ナイル川", feature: "象形文字、ピラミッド", image: "/public/images/civilization/ejiputo.jpg" },
  { id: 3, name: "インダス文明", river: "インダス川", feature: "インダス文字、モヘンジョ=ダロ", image: "/public/images/civilization/indasu.jpg" },
  { id: 4, name: "黄河文明", river: "黄河", feature: "甲骨文字、青銅器", image: "/public/images/civilization/tyugoku.jpg" },
  { id: 5, name: "マヤ文明", river: "なし", feature: "マヤ文字、ゼロの概念", image: "/public/images/civilization/maya.jpg" },
  { id: 6, name: "アステカ文明", river: "テスココ湖", feature: "浮き島農法、アステカ暦", image: "/public/images/civilization/asuteka.jpg" },
  { id: 7, name: "インカ文明", river: "ウルバンバ川", feature: "キープ、マチュ・ピチュ", image: "/public/images/civilization/inka.jpg" },
  { id: 8, name: "エーゲ文明", river: "なし", feature: "クレタ文明、ミケーネ文明", image: "/public/images/civilization/ege.jpg" },
  { id: 9, name: "ギリシア文明", river: "なし", feature: "ポリス、パルテノン神殿", image: "/public/images/civilization/girisya.jpg" },
  { id: 10, name: "ローマ文明", river: "テヴェレ川", feature: "ローマ法、コロッセオ", image: "/public/images/civilization/roma.jpg" }
];

// アプリ2: 紀元前の時代一覧
let eras = [
  { id: 1, name: "縄文時代", period: "BC14000頃 - BC300頃", region: "日本", feature: "縄文土器", image: "/public/images/era/jomon.jpg" },
  { id: 2, name: "春秋戦国時代", period: "BC770 - BC221", region: "中国", feature: "諸子百家", image: "/public/images/era/sengoku.jpg" },
  { id: 3, name: "プトレマイオス朝", period: "BC305 - BC30", region: "エジプト", feature: "ロゼッタ・ストーン", image: "/public/images/era/putore.jpg" },
  { id: 4, name: "旧石器時代", period: "200万年前 - BC14000頃", region: "世界各地", feature: "打製石器", image: "/public/images/era/kyuu.jpg" },
  { id: 5, name: "弥生時代", period: "BC300頃 - AD250頃", region: "日本", feature: "水稲耕作", image: "/public/images/era/yayoi.jpg" },
  { id: 6, name: "秦", period: "BC221 - BC206", region: "中国", feature: "始皇帝", image: "/public/images/era/shin.jpg" },
  { id: 7, name: "漢", period: "BC206 - AD220", region: "中国", feature: "シルクロード", image: "/public/images/era/kan.jpg" },
  { id: 8, name: "アケメネス朝", period: "BC550 - BC330", region: "オリエント", feature: "ダレイオス1世", image: "/public/images/era/akemenesu.jpg" },
  { id: 9, name: "ローマ共和政", period: "BC509 - BC27", region: "地中海", feature: "ポエニ戦争", image: "/public/images/era/roma.jpg" },
  { id: 10, name: "マウリヤ朝", period: "BC317 - BC180頃", region: "インド", feature: "アショーカ王", image: "/public/images/era/mauriya.jpg" }
];

// アプリ3: 世界の観光地一覧
let spots = [
  { id: 1, name: "モン・サン・ミシェル", country: "フランス", type: "文化遺産", description: "海に浮かぶ修道院", image: "/public/images/spot/mon.jpg" },
  { id: 2, name: "マチュ・ピチュ", country: "ペルー", type: "複合遺産", description: "空中都市", image: "/public/images/spot/matyu.jpg" },
  { id: 3, name: "アンコール・ワット", country: "カンボジア", type: "文化遺産", description: "巨大寺院", image: "/public/images/spot/anko.jpg" },
  { id: 4, name: "万里の長城", country: "中国", type: "文化遺産", description: "最大の建造物", image: "/public/images/spot/banri.jpg" },
  { id: 5, name: "タージ・マハル", country: "インド", type: "文化遺産", description: "白亜の霊廟", image: "/public/images/spot/taji.jpg" },
  { id: 6, name: "ピラミッド", country: "エジプト", type: "文化遺産", description: "王の墓", image: "/public/images/spot/piramiddo.jpg" },
  { id: 7, name: "ペトラ", country: "ヨルダン", type: "文化遺産", description: "古代都市", image: "/public/images/spot/petora.jpg" },
  { id: 8, name: "コロッセオ", country: "イタリア", type: "文化遺産", description: "円形闘技場", image: "/public/images/spot/koro.jpg" },
  { id: 9, name: "サグラダ・ファミリア", country: "スペイン", type: "文化遺産", description: "未完の教会", image: "/public/images/spot/sagu.jpg" },
  { id: 10, name: "グランド・キャニオン", country: "アメリカ", type: "自然遺産", description: "大峡谷", image: "/public/images/spot/gran.jpg" }
];


//menu top

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <title>Webプログラミング課題メニュー</title>
      <style>
        body, html { margin: 0; padding: 0; height: 100%; font-family: sans-serif; }
        .container { display: flex; height: 100%; width: 100%; }
        
        .menu-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: white;
          text-align: center;
        }

        h2 { font-size: 2rem; margin: 0 0 15px 0; border-bottom: 2px solid rgba(255,255,255,0.5); padding-bottom: 5px; }
        p { font-size: 1rem; font-weight: bold; }

        .app1 { background-color: #5d4037; } 
        .app2 { background-color: #2e7d32; }
        .app3 { background-color: #0277bd; }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="/civilization/list" class="menu-item app1">
          <h2>CIVILIZATION</h2>
          <p>文明一覧システム</p>
        </a>

        <a href="/era/list" class="menu-item app2">
          <h2>ERA</h2>
          <p>紀元前の時代一覧</p>
        </a>

        <a href="/spot/list" class="menu-item app3">
          <h2>TOURIST SPOT</h2>
          <p>世界の観光地一覧</p>
        </a>
      </div>
    </body>
    </html>
  `);
});

// アプリ1: 文明一覧システム (/civilization)

app.get("/civilization/list", (req, res) => {
  res.render('civilization_list', { data: civilizations });
});

app.get("/civilization/detail/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = civilizations.find(item => item.id === id);
  if (!target) return res.status(404).send("データが見つかりません");
  res.render('civilization_detail', { data: target });
});

app.get("/civilization/create", (req, res) => {
  res.render('civilization_create');
});

// 登録
app.post("/civilization/add", (req, res) => {
  const newId = civilizations.length > 0 ? Math.max(...civilizations.map(d => d.id)) + 1 : 1;
  const newItem = {
    id: newId,
    name: req.body.name,
    river: req.body.river,
    feature: req.body.feature,
    image: req.body.image
  };
  civilizations.push(newItem);
  res.redirect('/civilization/list');
});

app.get("/civilization/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = civilizations.find(item => item.id === id);
  res.render('civilization_edit', { data: target });
});

// 更新
app.post("/civilization/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = civilizations.findIndex(item => item.id === id);
  if (index !== -1) {
    civilizations[index].name = req.body.name;
    civilizations[index].river = req.body.river;
    civilizations[index].feature = req.body.feature;
    civilizations[index].image = req.body.image;
  }
  res.redirect('/civilization/list');
});

app.get("/civilization/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = civilizations.find(item => item.id === id);
  res.render('civilization_delete', { data: target });
});

app.post("/civilization/delete-confirm/:id", (req, res) => {
  const id = Number(req.params.id);
  civilizations = civilizations.filter(item => item.id !== id);
  res.redirect('/civilization/list');
});


// アプリ2: 紀元前の時代一覧 (/era)

app.get("/era/list", (req, res) => {
  res.render('era_list', { data: eras });
});

app.get("/era/detail/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = eras.find(item => item.id === id);
  res.render('era_detail', { data: target });
});

app.get("/era/create", (req, res) => {
  res.render('era_create');
});

app.post("/era/add", (req, res) => {
  const newId = eras.length > 0 ? Math.max(...eras.map(d => d.id)) + 1 : 1;
  const newItem = {
    id: newId,
    name: req.body.name,
    period: req.body.period,
    region: req.body.region,
    feature: req.body.feature,
    image: req.body.image
  };
  eras.push(newItem);
  res.redirect('/era/list');
});

app.get("/era/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = eras.find(item => item.id === id);
  res.render('era_edit', { data: target });
});

app.post("/era/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = eras.findIndex(item => item.id === id);
  if (index !== -1) {
    eras[index].name = req.body.name;
    eras[index].period = req.body.period;
    eras[index].region = req.body.region;
    eras[index].feature = req.body.feature;
    eras[index].image = req.body.image;
  }
  res.redirect('/era/list');
});

app.get("/era/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = eras.find(item => item.id === id);
  res.render('era_delete', { data: target });
});

app.post("/era/delete-confirm/:id", (req, res) => {
  const id = Number(req.params.id);
  eras = eras.filter(item => item.id !== id);
  res.redirect('/era/list');
});


// アプリ3: 世界の観光地一覧 (/spot)

app.get("/spot/list", (req, res) => {
  res.render('spot_list', { data: spots });
});

app.get("/spot/detail/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = spots.find(item => item.id === id);
  res.render('spot_detail', { data: target });
});

app.get("/spot/create", (req, res) => {
  res.render('spot_create');
});

app.post("/spot/add", (req, res) => {
  const newId = spots.length > 0 ? Math.max(...spots.map(d => d.id)) + 1 : 1;
  const newItem = {
    id: newId,
    name: req.body.name,
    country: req.body.country,
    type: req.body.type,
    description: req.body.description,
    image: req.body.image
  };
  spots.push(newItem);
  res.redirect('/spot/list');
});

app.get("/spot/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = spots.find(item => item.id === id);
  res.render('spot_edit', { data: target });
});

app.post("/spot/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = spots.findIndex(item => item.id === id);
  if (index !== -1) {
    spots[index].name = req.body.name;
    spots[index].country = req.body.country;
    spots[index].type = req.body.type;
    spots[index].description = req.body.description;
    spots[index].image = req.body.image;
  }
  res.redirect('/spot/list');
});

app.get("/spot/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const target = spots.find(item => item.id === id);
  res.render('spot_delete', { data: target });
});

app.post("/spot/delete-confirm/:id", (req, res) => {
  const id = Number(req.params.id);
  spots = spots.filter(item => item.id !== id);
  res.redirect('/spot/list');
});

// 404
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/error.html'); 
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));