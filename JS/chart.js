document.addEventListener('DOMContentLoaded', () => {
    // ===========================================
    // 診断データ
    // ===========================================
    const QUIZ_DATA = {
        '1': { q_num: 'Q1', question: '未来のあなたはパソコンよりも<br>ペンや紙の方が似合う？', yes: '2', no: '5' },
        '2': { q_num: 'Q2', question: 'その作品は自分で操作できた方が楽しい？', yes: '1a', no: '3' },
        '3': { q_num: 'Q3', question: 'その表現<br>時間の流れで見せたい？', yes: '4', no: '2a' },
        '4': { q_num: 'Q4', question: '2次元に行けるなら<br>行きたい？', yes: '3a', no: '4a' },
        '5': { q_num: 'Q5', question: 'それは見えない世界を<br>守る仕事？', yes: '5a', no: '6' },
        '6': { q_num: 'Q6', question: 'あなたの武器は<br>ハンダゴテ？', yes: '6a', no: '7' },
        '7': { q_num: 'Q7', question: 'それは人間の頭脳を<br>マネするもの？', yes: '7a', no: '8' },
        '8': { q_num: 'Q8', question: 'それはネットやアプリで<br>人とつながる？', yes: '8a', no: '9a' },
        // 結果ノード
        '1a': { result: 'あなたにおすすめの分野は...<br>', detail: 'ゲーム', department: 'ゲーム' },
        '2a': { result: 'あなたにおすすめの分野は...<br>', detail: 'デザイン', department: 'デザイン' },
        '3a': { result: 'あなたにおすすめの分野は...<br>', detail: 'アニメ', department: 'アニメ' },
        '4a': { result: 'あなたにおすすめの分野は...<br>', detail: 'CG・映像', department: 'CG・映像' },
        '5a': { result: 'あなたにおすすめの分野は...<br>', detail: 'ネットワーク・セキュリティー', department: 'ネットワーク・セキュリティー' },
        '6a': { result: 'あなたにおすすめの分野は...<br>', detail: '電気・電子', department: '電気・電子' },
        '7a': { result: 'あなたにおすすめの分野は...<br>', detail: 'AI', department: 'AI' },
        '8a': { result: 'あなたにおすすめの分野は...<br>', detail: 'Web・モバイル', department: 'Web・モバイル' },
        '9a': { result: 'あなたにおすすめの分野は...<br>', detail: '情報処理', department: '情報処理' },
    };

    // ===========================================
    // 学科ごとのデータと展示情報
    // パスを全て「img/gakka/xxx.png」形式に統一（Web・モバイルの「../」を削除）
    // ===========================================
    const DEPARTMENT_DATA = {
        'ゲーム': {
            color: '#DD6541', // 赤
            exhibitions: [
                {
                    shopName: 'ゲーム制作科',
                    description: '「今年も4号館の2階と3階の実習室にて学生作品の展示を行います。今年はそれに加え2号館4階にてTGS2025　AR/VRコーナー、オールアクセシビリティコーナーに出展したオリジナルデバイスを利用したVR学生作品と大型歩行型筐体KatVRを利用したVR学生作品の展示も行います。 作品選考会もありますので、お気に入りの作品に投票してください。皆さんのお越しをお待ちしております！！」',
                    image: '../img/gakka/4_CI.png',
                    locationBadge1: '4号館<br>2階&nbsp;422&amp;<br>3階&nbsp;432教室',
                    locationBadge2: '2号館<br>4階&nbsp;421教室',
                },
                {
                    shopName: 'ゲーム企画科',
                    description: 'ゲーム企画科では学生作品の展示の他、「遊びのイベント」も企画・運営し、新しい表現を模索しております。731実習室（7号館3階1番教室）にて是非ご覧ください！！',
                    image: '../img/gakka/7_CR.png',
                    locationBadge1: '7号館',
                    locationBadge2: '3階&nbsp;731教室',
                },
                {
                    shopName: 'ゲーム制作研究科',
                    description: 'ゲーム制作研究科の学生が制作したゲーム試遊が出来ます！是非7号館４階へご来場ください！',
                    image: '../img/gakka/7_CU.png',
                    locationBadge1: '7号館',
                    locationBadge2: '4階&nbsp;741教室',
                }
            ]
        },
        'デザイン': {
            color: '#E7AC50', // 紫
            exhibitions: [{
                shopName: 'グラフィックデザイン科',
                description: 'グラフィックデザイン科2025年度前期学習成果発表展。「触れる」をテーマに、日常の課題を体感的に伝える作品を中心に、前期授業にて学生が取り組んだ作品を展示します。是非作品に直接触れて体感してください。',
                image: '../img/gakka/7_AG.png',
                locationBadge1: '7号館',
                locationBadge2: '6階&nbsp;761&762教室',
            }]
        },
        'アニメ': {
            color: '#AAC862', // 黄色
            exhibitions: [{
                shopName: 'アニメーション科・アニメーション研究科',
                location: '6号館2階 アニメーションラボ',
                description: '絵コンテから動画までの制作過程を公開。学生の描いた貴重な原画も見られます！',
                image: '../img/gakka/7_AC_AR.png',
                locationBadge1: '7号館',
                locationBadge2: '5階&nbsp;751教室',
            }]
        },
        'CG・映像': {
            color: '#E3D643', // 青
            exhibitions: [
                {
                    shopName: 'CG映像制作科',
                    description: '5号館1階スタジオにて、1・2年生が手がけたCG・VFX作品を巨大スクリーンで上映中！不思議でワクワクする映像体験をぜひご覧ください。',
                    image: '../img/gakka/5_AV.png',
                    locationBadge1: '5号館',
                    locationBadge2: '1階&nbsp;511教室',
                },
                {
                    shopName: 'コンピューターグラフィックス科',
                    description: 'CG業界でニーズが高まるテクニカルディレクター、テクニカルアーティスト、Houdiniスペシャリストを育成する学科です。学生作品や研究パネルの展示のほか、CGツールも体験できます。みなさまの来場をお待ちしています！',
                    image: '../img/gakka/9_AD.png',
                    locationBadge1: '5号館',
                    locationBadge2: '5階&nbsp;551教室',
                }
            ]
        },
        'ネットワーク・セキュリティー': {
            color: '#20ABA9', // エメラルドグリーン
            exhibitions: [{
                shopName: 'ネットワークセキュリティ科',
                description: 'みんなのパスワードは大丈夫？？今使っているパスワードの強度を調べてみませんか？？ネットワークセキュリティ科の学科展示会場でお待ちしています(#^.^#)。',
                image: '../img/gakka/1_CC.png',
                locationBadge1: '本館',
                locationBadge2: '5階&nbsp;152教室',
            }]
        },
        '電気・電子': {
            color: '#2DA869', // 緑
            exhibitions: [
                {
                    shopName: '電子応用工学科',
                    description: '電子回路＆組込みソフトなどの『モノづくり』を学ぶ学科です。大会出場したマイクロマウス、家電を再現した製作物の展示、ラズベリーパイによる『オモシロIoT体験』やセンサー回路製作の体験コーナーもあります。',
                    image: '../img/gakka/7_EO.png',
                    locationBadge1: '7号館',
                    locationBadge2: '1階&nbsp;712教室',
                },
                {
                    shopName: '電気工学科・電気工事技術科',
                    description: '電気科のブースでは、太陽光発電などエネルギーを生み出す技術や、電気配線の仕組みを体験できる展示が盛り沢山です。また実習で作ったＬＡＮケーブルは、実際にご自宅で使うことができます、ぜひ体験してください。',
                    image: '../img/gakka/7_KJ_KK.png',
                    locationBadge1: '7号館',
                    locationBadge2: '7階&nbsp;773教室',
                }
            ]
        },
        'AI': {
            color: '#4484BE', // 青
            exhibitions: [{
                shopName: 'AIシステム科',
                description: 'AIシステムを展示しています！卒業生の作品も展示しているのでお越しください（＾－＾♪',
                image: '../img/gakka/1_CA.png',
                locationBadge1: '本館',
                locationBadge2: '8階&nbsp;181&182教室',
            }]
        },
        'Web・モバイル': {
            color: '#A55A99', // オレンジ
            exhibitions: [
                {
                    shopName: 'Webデザイン科',
                    description: '学生の作品、ちょっとのぞいてみませんか？』<br><br>Webデザイン科では、学生たちが授業で取り組んできたWebサイトやWebページ、バナー広告、ランディングページなどの作品を展示しています。デザインの工夫や制作の裏側について、学生本人が直接ご紹介します。「どんな勉強をしているの？」「どんなスキルが身につくの？」といった疑問にも答えますので、ぜひ気軽にお立ち寄りください。',
                    image: '../img/gakka/7_AW.png',
                    locationBadge1: '7号館',
                    locationBadge2: '7階&nbsp;771教室',
                },
                {
                    shopName: 'モバイルアプリケーション開発科',
                    description: '学生が作ったアプリを展示しています。触って、体験して、楽しんで、モバイルアプリケーション開発科の魅力を存分に味わってください！',
                    image: '../img/gakka/7_CM.png',
                    locationBadge1: '7号館',
                    locationBadge2: '8階&nbsp;781教室',
                }
            ]
        },
        '情報処理': {
            color: '#1AADDF', // 薄いグレー
            exhibitions: [
                {
                    shopName: 'DXスペシャリスト科',
                    description: '在校生主体で、DXについての解説や学習内容の展示、制作物展示を行っています。ぜひ、遊びに来てください！',
                    image: '../img/gakka/1_JK.png',
                    locationBadge1: '本館',
                    locationBadge2: '6階&nbsp;162教室',
                },
                {
                    shopName: '情報処理科・高度情報処理科・情報システム開発科',
                    description: '気に入った画像をチョイスして、オリジナルプラバンを作ろう！タッチタイピングソフト「たっちくん」で山手線駅名を入力する速さを競います。タイピングに自信のある人、タイピング初心者も是非ご参加ください！',
                    image: '../img/gakka/7_JN_JZ_JY.png',
                    locationBadge1: '7号館',
                    locationBadge2: '3階&nbsp;732教室',
                }
            ]
        }
    };

    // ===========================================
    // HTML要素の取得
    // ===========================================
    const startButton = document.getElementById('start-button');
    const questionBox = document.getElementById('question');
    const choiceButtons = document.getElementById('choice-buttons');
    const buttonsContainer = document.getElementById('buttons');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const restartButton = document.getElementById('restart-button');

    // アコーディオン要素
    const accordionContainer = document.getElementById('accordion-container');
    const accordionHeader = document.querySelector('.accordion-header');
    const accordionContent = document.querySelector('.accordion-content');
    const accordionHeaderText = document.querySelector('.accordion-header .header-text');

    // 診断の現在の状態を保持する変数
    let currentQuizId = '1';

    // ===========================================
    // 初期設定
    // ===========================================
    const initializeUI = () => {
        questionBox.style.display = 'block';
        choiceButtons.style.display = 'none';
        restartButton.style.display = 'none';
        accordionContainer.style.display = 'none';
    };
    initializeUI();

    // ===========================================
    // アコーディオン表示更新関数
    // ===========================================
    /**
     * 学科名に基づいてアコーディオンの展示情報を更新し表示する。
     * @param {string} departmentName - 学科名 (例: 'ゲーム', 'Web・モバイル')
     */
    const updateAccordion = (departmentName) => {
        const data = DEPARTMENT_DATA[departmentName];
        if (!data) {
            console.error('学科データが見つかりません:', departmentName);
            return;
        }

        // 1. 色の変更: CSSカスタムプロパティを更新
        accordionContainer.style.setProperty('--main-color', data.color);

        const exhibitions = data.exhibitions;
        let allCardsHTML = '';

        // 2. 内容の変更: 展示データごとにカードHTMLを生成
        exhibitions.forEach(exhibit => {
            const shopName = exhibit.shopName;
            const description = exhibit.description;

            // ★修正ポイント★: データ側のパスを統一したため、複雑な処理を削除
            const imagePath = exhibit.image;

            const locationBadge1 = exhibit.locationBadge1;
            const locationBadge2 = exhibit.locationBadge2;

            allCardsHTML += `
                <div class="accordion-card">
                    <img src="${imagePath}" alt="${data.departmentTitle}" class="card-image"/> 
                    <div class="accordion-info">
                        <h4 class="shop-name">${shopName}</h4>
                        <div class="location-badges">
                            <span class="badg">${locationBadge1}</span> 
                            <span class="badg">${locationBadge2}</span>
                        </div>
                        <p class="accordion-description">
                            ${description}
                        </p>
                    </div>
                </div>
            `;
        });

        // accordion-content の中身を生成した全てのカードHTMLに置き換える
        accordionContent.innerHTML = allCardsHTML;

        // アコーディオンヘッダーのテキストを更新し、分野名を含める
        accordionHeaderText.innerHTML =
            `<span class="result-department-in-header">${departmentName}</span>分野のあなたは この展示がおすすめ！`;

        // 3. アコーディオンを表示し、自動で開く
        accordionContainer.style.display = 'block';
        accordionHeader.classList.add('active');
        accordionContent.classList.add('active');
    };

    // ===========================================
    // 質問・結果表示のメイン関数
    // ===========================================
    /**
     * 次の質問または結果を表示する。
     * @param {string} id - QUIZ_DATAのキー
     */
    const showNext = (id) => {
        const item = QUIZ_DATA[id];

        if (!item) {
            console.error('無効なIDが指定されました:', id);
            return;
        }

        currentQuizId = id;

        // 結果 (IDに 'a' が含まれる場合)
        if (id.endsWith('a')) {
            // 結果文をセット
            questionBox.innerHTML = item.result + `<span class="result-department">${item.detail}</span>`;

            // Yes/Noボタンを非表示、リスタートボタンを表示
            choiceButtons.style.display = 'none';
            restartButton.style.display = 'block';

            // アコーディオンを更新・表示する
            updateAccordion(item.department);
        }
        // 質問
        else {
            // 質問番号と質問文をセット
            const questionNumber = item.q_num ? `<span class="quiz-number">${item.q_num}</span><br>` : '';
            questionBox.innerHTML = questionNumber + item.question;

            // Yes/Noボタンを表示、リスタートボタンとアコーディオンを非表示
            choiceButtons.style.display = 'flex';
            restartButton.style.display = 'none';
            accordionContainer.style.display = 'none'; // 質問中は非表示に戻す
        }
    };

    // ===========================================
    // イベントリスナー
    // ===========================================

    // 1. 「スタート！！」ボタンのイベント
    startButton.addEventListener('click', () => {
        buttonsContainer.style.display = 'none';
        questionBox.style.display = 'block';
        showNext(currentQuizId);
    });

    // 2. 「はい (YES)」ボタンのイベント
    yesButton.addEventListener('click', () => {
        const currentItem = QUIZ_DATA[currentQuizId];
        if (currentItem && currentItem.yes) {
            showNext(currentItem.yes);
        }
    });

    // 3. 「いいえ (NO)」ボタンのイベント
    noButton.addEventListener('click', () => {
        const currentItem = QUIZ_DATA[currentQuizId];
        if (currentItem && currentItem.no) {
            showNext(currentItem.no);
        }
    });

    // 4. 「最初からやり直す」ボタンのイベント
    restartButton.addEventListener('click', () => {
        // 状態を初期化
        currentQuizId = '1';
        restartButton.style.display = 'none';
        choiceButtons.style.display = 'none';
        accordionContainer.style.display = 'none'; // アコーディオンを非表示に戻す

        // 初期画面に戻す
        questionBox.innerHTML = 'Yes/No診断で<br>見に行く学科展示を決めよう！';
        buttonsContainer.style.display = 'block';
    });

    // 5. アコーディオンの開閉機能
    accordionHeader.addEventListener('click', () => {
        accordionHeader.classList.toggle('active');
        accordionContent.classList.toggle('active');
    });
});