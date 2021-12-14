/***** ドラッグ開始時の処理 *****/
function dragstart(event) {
	//ドラッグするデータのid名をDataTransferオブジェクトにセット
	event.dataTransfer.setData("text", event.target.id);
}


/***** ドラッグ要素がドロップ要素に重なっている間の処理 *****/
function dragover(event) {
	//dragoverイベントをキャンセルして、ドロップ先の要素がドロップを受け付けるようにする
	event.preventDefault();
}

/***** ドロップ時の処理 *****/
function drop(event) {
	//ドラッグされたデータのid名をDataTransferオブジェクトから取得
	var id_name = event.dataTransfer.getData("text");

	// イメージをドラッグされたとき親のdiv要素idを取得する
	// img要素のid「img_○○」とdiv要素のid「○○」としているため文字切り抜き
	if (id_name.substring(0, 3) == "img") {
		id_name = id_name.substring(4, id_name.length);
	}

	//id名からドラッグされた要素を取得
	var drag_elm = document.getElementById(id_name);
	//ドロップ先にドラッグされた要素を追加
	event.currentTarget.appendChild(drag_elm);
	//エラー回避のため、ドロップ処理の最後にdropイベントをキャンセルしておく
	event.preventDefault();
}

/***** 確定ボタン押下時の処理 *****/
function msg() {

	// 前回開設時のの確定内容をクリア
	document.getElementById("kakutei_naiyou").innerHTML = "";

	// テキスト編集処理
	var lis = document.getElementById("teamA").getElementsByTagName("p");
	var str = "【" + lis[0].innerText + "】<br>";

	lis = document.getElementById("teamA").getElementsByTagName("div");
	for (i = 0; i < lis.length; i++) {
		str = str + "  " + lis[i].innerText + "<br>";
	}

	lis = document.getElementById("teamB").getElementsByTagName("p");
	var str = str + "<br>【" + lis[0].innerText + "】<br>";

	lis = document.getElementById("teamB").getElementsByTagName("div");
	for (i = 0; i < lis.length; i++) {
		str = str + "  " + lis[i].innerText + "<br>";
	}

	// 確定内容の表示
	document.getElementById("kakutei_naiyou").innerHTML = str;

	// 確定ページに移動
	window.location.hash = "kakutei";

}

/***** メンバ追加ボタン押下時の処理 *****/
function add() {

	var clis = document.getElementsByClassName("person");

	// 人の選択のクラス名も「person」になっているので除外する
	// 今さらクラス名変えるのがめんどくさいだけ
	var count = 0;
	var regex = /^sel_/;
	for (i = 0; i < clis.length; i++) {
		if (!regex.test(clis[i].id)) {
			count++;
		}
	}
	// 10人まで追加できるようにする
	// デザインが崩れるだけ
	if (count == 10) {
		alert("これ以上は追加できません");
		return false;
	}

	// メンバ追加ページに移動
	window.location.hash = "person_add";

	// 人の選択ですでに追加した人のラジオボタンを無効にする
	var lis = document.getElementById("person_select").getElementsByTagName("input");
	for (i = 0; i < lis.length; i++) {
		if (document.getElementById(lis[i].value) != null) {
			lis[i].setAttribute("disabled", "disabled");
			document.getElementById("sel_" + lis[i].value).className = "sel_person";
		}
	}

	// 人の選択のリセット
	document.selectFrm.reset();
	// アップロードのリセット
	document.upFrm.reset();
	document.getElementById("viewFile").innerHTML = "";
}

/***** メンバダブルクリック時の処理 *****/
function introduction(event) {
	// メンバ詳細ページに移動
	window.location.hash = "introduction";

	chgMenuIntro(event.target.id);
}
/***** ページが読み込まれた後の処理 *****/
function home2() {
	// lightboxを表示させてページを更新すると
	// 中途半端に情報が残ってしまうためリセット対応
	chgMenu("");
	window.location.hash = "home";

	// デフォルトで表示する人の追加
	var defaultPerson = new Array("yamada", "satou", "suzuki");

	for (i = 0; i < defaultPerson.length; i++) {

		var id = defaultPerson[i];
		var imgsrc = document.getElementById("sel_img_" + defaultPerson[i]);

		var nameText = "";
		var introText = "";
		var pName = document.getElementById("sel_" + defaultPerson[i]);
		var childs = pName.childNodes;
		for (j = 0; j < childs.length; j++) {
			if (childs[j].className == "sel_name") {
				nameText = childs[j].innerText;

			} else if (childs[j].className == "sel_intro") {
				introText = childs[j].innerText;
			}

			if (nameText.length > 0 && introText.length > 0) {
				break;
			}
		}

		divAdd(id, imgsrc, nameText, introText);
	}
}

/***** 閉じるボタン押下時の処理 *****/
function home() {
	// アンカーは何でもいい
	window.location.hash = "home";
}

/***** メンバ追加のメニュー押下時の処理 *****/
function chgMenu(obj) {
	// 直ID名指定どうにかしたい…

	// 人の選択押下時またはクリア時の値
	var openid = "person_select";
	var closeid = "person_upload";

	// 人のアップロードの時の値
	if (obj.id == "upload") {
		openid = "person_upload";
		closeid = "person_select";
	}

	// ページ要素の表示・非表示
	document.getElementById(openid).style.display = "block";
	document.getElementById(closeid).style.display = "none";

	// 表示されている要素のメニューの色指定(明るい赤)
	// 中身要素のid「person_○○」とメニュー要素のid「○○」としているため文字切り抜き
	document.getElementById(openid.substring(7, openid.length)).style.backgroundColor = "#ff002a";
	document.getElementById(openid.substring(7, openid.length)).style.borderColor = "#ff002a";

	// 非表示にされている要素のメニューの色指定(薄い赤)
	document.getElementById(closeid.substring(7, closeid.length)).style.backgroundColor = "#ff526e";
	document.getElementById(closeid.substring(7, closeid.length)).style.borderColor = "#ff526e";
}

/***** メンバ詳細のメニュー押下時の処理 *****/
function chgMenuIntro(id) {

	var lis = document.getElementsByClassName("introPerson");

	var regexMenu = /^menu_/
	var regexImg = /^img_/

	var selectId = "";
	if (regexMenu.test(id)) {
		selectId = id.replace(regexMenu, "");

	} else if (regexImg.test(id)) {
		selectId = "intro_" + id.replace(regexImg, "");

	} else {
		selectId = "intro_" + id;
	}

	// 要素の表示・非表示等の処理
	for (i = 0; i < lis.length; i++) {

		if (selectId == lis[i].id) {
			// 選択要素
			lis[i].style.display = "block";

			// 表示されている要素のメニューの色指定(明るい青)
			// 中身要素のid「○○」とメニュー要素のid「menu_○○」としているため文字連結
			document.getElementById("menu_" + lis[i].id).style.backgroundColor = "#107dc6";
			document.getElementById("menu_" + lis[i].id).style.borderColor = "#107dc6";

		} else {
			//非選択要素
			lis[i].style.display = "none";

			// 非表示にされている要素のメニューの色指定(薄い青)
			document.getElementById("menu_" + lis[i].id).style.backgroundColor = "#73b2dd";
			document.getElementById("menu_" + lis[i].id).style.borderColor = "#73b2dd";
		}
	}
}

/***** 人のアップロードでファイル選択時の処理 *****/
function uploadFile(obj) {

	// ファイルが何も選択されていない場合、中断
	if (!obj.files.length) return;

	// ファイルの取得
	var input = obj.files[0];

	// イメージファイルの場合のみ処理を行う
	if (input.type.match('image.*')) {

		// 画像のプレビュー表示
		var lis = document.getElementById("viewFile").getElementsByTagName("img");
		if (lis.length == 0) {
			var img = document.createElement('img');
		} else {
			// 一度ファイル指定して変更する場合はimg要素を変更する
			// 一つしかプレビューしたくないため
			var img = lis[0];
		}
		var reader = new FileReader();

		//エラー処理
		reader.onerror = function (e) {
			console.log('error', e.target.error.code);
		};

		//読み込み後の処理
		reader.onload = function () {
			img.src = reader.result;
			img.width = 100;
			img.heght = 100;
			document.getElementById('viewFile').appendChild(img);
		};
		reader.readAsDataURL(input);
	}
}

/***** メンバの追加ページで追加ボタン押下時の処理 *****/
function personAdd() {

	var div = document.createElement('div');
	var img = document.createElement('img');

	// 人の選択・アップロードで表示されている方を判定
	if (document.getElementById("person_select").style.display == "block") {
		// 人の選択の場合

		// チェックされているラジオボタンの値の取得
		var checkId = "";
		for (var i = 0; i < document.selectFrm.pSel.length; i++) {
			if (document.selectFrm.pSel[i].checked == true) {
				checkId = document.selectFrm.pSel[i].value;
			}
		}

		// 未選択の場合、中断
		if (checkId.length == 0) {
			alert("人が選択されていません");
			return false;
		}

		var id = checkId;
		var imgsrc = document.getElementById("sel_img_" + checkId);

		var nameText = "";
		var introText = "";
		var pName = document.getElementById("sel_" + checkId);
		var childs = pName.childNodes;
		for (j = 0; j < childs.length; j++) {
			if (childs[j].className == "sel_name") {
				nameText = childs[j].innerText;

			} else if (childs[j].className == "sel_intro") {
				introText = childs[j].innerText;
			}

			if (nameText.length > 0 && introText.length > 0) {
				break;
			}
		}

		divAdd(id, imgsrc, nameText, introText);

	} else {
		// アップロードの場合

		// 入力チェック
		// ここでimgやname変数に設定すると画像と名前が消えてしまうため直書き
		if (document.getElementById("viewFile").getElementsByTagName("img").length == 0) {
			alert("ファイルが選択されていません");
			return false;
		}

		if (document.getElementById("personName").value.trim().length == 0) {
			alert("名前が入力されていません");
			return false;
		}

		// デザインがくずれるから抑止してるだけ
		var ret = document.getElementById("personIntro").value.match(/\n/g);
		if (ret != null && ret.length >= 7) {
			alert("詳細は7行以内で入力してください");
			return false;
		}

		// 設定するidの存在チェック
		var idName = "";
		var i = 1;
		while (idName.length == 0) {
			if (document.getElementById("person" + i) == null) {
				idName = "person" + i;
			} else {
				i++;
			}
		}

		var lis = document.getElementById("viewFile").getElementsByTagName("img");
		var imgsrc = lis[0];

		var nameText = document.getElementById("personName").value.trim();
		var introText = document.getElementById("personIntro").value.trim();
		introText = introText.replace(/</g, "&lt;");
		introText = introText.replace(/>/g, "&gt;");
		introText = introText.replace(/\n/g, "<br>");

		divAdd(idName, imgsrc, nameText, introText);

	}
	// デフォルトページに移動する
	window.location.hash = "home";

	// 人の選択のリセット
	document.selectFrm.reset();
	// 人のアップロードのリセット
	document.upFrm.reset();
	document.getElementById("viewFile").innerHTML = "";
}

/***** 確定ページでテキスト出力ボタン押下時の処理 *****/
function textDownload() {

	// 改行を取得したいため一度HTMLでテキストを取得
	var text = document.getElementById("kakutei_naiyou").innerHTML;
	// タグを改行に変換
	text = text.replace(/\n/g, "");
	text = text.replace(/<br>/g, "\r\n");
	var blob = new Blob([text], { 'type': 'text/plain' });

	// リンク要素を生成
	// GoogleChromeしか考えていないためwebkitURLでいいや
	var a = document.createElement('a');
	a.setAttribute('href', webkitURL.createObjectURL(blob));
	a.setAttribute('target', '_blank');
	a.download = "group.txt";

	// ダウンロード実行したいためclickイベント
	var e = document.createEvent("MouseEvents");
	e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, true, false, false, 0, null);
	a.dispatchEvent(e);
}


/***** 人の追加の内部処理 *****/
function divAdd(id, imgsrc, nameText, introText) {
	// チーム分けの追加 ----------------------
	var div = document.createElement('div');
	var img = document.createElement('img');

	// 追加する人の画像の設定
	img.id = "img_" + id;
	img.src = imgsrc.src;
	img.width = 100;
	img.heght = 100;

	div.appendChild(img);

	// 追加する人の名前とドラッグ＆ドロップの設定
	div.innerHTML = div.innerHTML + "<br>" + nameText
	div.id = id;
	div.className = "person";
	div.setAttribute("draggable", "true");
	div.setAttribute("ondragstart", "dragstart(event)");
	div.setAttribute("ondblclick", "introduction(event)");

	// デフォルトの置き場に追加
	var team = document.getElementById("teamDefault");
	team.appendChild(div);

	// 人の詳細の追加 ----------------------

	// 人の詳細のメニュー
	var liMenu = document.createElement('li');
	liMenu.id = "menu_intro_" + id;
	liMenu.setAttribute("onClick", "chgMenuIntro(this.id)");
	liMenu.innerText = nameText;

	// 人の詳細のメニューに追加
	var introMenu = document.getElementById("introduction_menu").getElementsByTagName("ul");
	introMenu[0].appendChild(liMenu);

	// 人の詳細
	var div2 = document.createElement('div');
	var img2 = document.createElement('img');
	//var div_name = document.createElement('div');
	var div_intro = document.createElement('div');

	// 追加する人の画像の設定
	img2.id = "intro_img_" + id;
	img2.src = imgsrc.src;
	img2.width = 150;
	img2.heght = 150;

	div2.appendChild(img2);

	// 名前
	// メニューに表示されるからいったん消す
	//div_name.className = "intro_name";
	//div_name.innerText = nameText;

	//div2.appendChild(div_name);

	// 詳細
	div_intro.className = "intro_naiyou";
	div_intro.innerHTML = introText;

	div2.appendChild(div_intro);

	div2.id = "intro_" + id;
	div2.className = "introPerson";


	// 人の詳細の置き場に追加
	var intro = document.getElementById("introduction_person");
	intro.appendChild(div2);
}
