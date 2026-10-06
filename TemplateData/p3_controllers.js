(() => {
  const keys = ['diy_product','diy_controls','xbox_product','xbox_controls','hardware','capabilities','overview','input_matrix','making','parameters'];
  const titles = {
    zh:['01 自制手柄产品','02 自制手柄操作','03 Xbox 产品','04 Xbox 操作','05 硬件与信号','06 能力展示','07 快速指南','08 完整输入表','09 制作过程','10 参数与验证','实时输入检查'],
    en:['01 DIY product','02 DIY controls','03 Xbox product','04 Xbox controls','05 Hardware & signal','06 Capability in action','07 Quick guide','08 Full input inventory','09 Making','10 Parameters & evidence','Live input check']
  };
  const ui = {
    zh:{title:'手柄：能力展示、制作与输入',zoom:'放大 / 适合窗口',close:'返回',prev:'← 上一页',next:'下一页 →',live:'实时输入',hint:'← → 切页 · Esc 返回 · 放大后可滚动查看',device:'设备',none:'尚未检测到手柄；连接后按任意键',demo:'查看演示输入',real:'切换为实机输入',demoState:'演示输入 / 脚本数值',realState:'实机输入 / 当前状态',explain:'摇杆位置、扳机模拟量和按键高亮来自当前输入。这个检查页只读状态，不执行游戏动作。',demoExplain:'示例序列显示摇杆、相机、扳机和提交，不控制游戏；这些数值不代表实物性能。',raw:'原始按钮编号',foot:'显示更新约 30 Hz，属于软件观察窗口；不是硬件采样率、延迟或续航测试。',choose:'输入设备',left:'左摇杆',right:'右摇杆'},
    en:{title:'Controller: capability, making & input',zoom:'Enlarge / fit',close:'Back',prev:'← Previous',next:'Next →',live:'Live input',hint:'← → Switch pages · Esc back · Enlarge and scroll for detail',device:'Device',none:'No gamepad detected; connect and press a button',demo:'Try demo input',real:'Use device input',demoState:'DEMO INPUT / SCRIPTED VALUES',realState:'DEVICE INPUT / CURRENT STATE',explain:'Stick positions, analog triggers and button highlights come from current input. This read-only viewer does not execute game actions.',demoExplain:'A scripted stick, camera, trigger and submit sequence. It does not control the game or measure physical performance.',raw:'Raw button IDs',foot:'Display updates at about 30 Hz. This is a software viewer, not a hardware polling-rate, latency or battery-life test.',choose:'Input device',left:'Left stick',right:'Right stick'}
  };
  let lang='zh',selected=6,resume=false,demo=false,deviceIndex=-1,last=0,timer=0,deviceSignature='';
  const names=['A','B','X','Y','LB','RB','LT','RT','View','Menu','L3','R3','D ↑','D ↓','D ←','D →','Home'];
  const dialog=document.createElement('dialog');dialog.id='controller-guide';dialog.className='controller-dialog';dialog.setAttribute('aria-labelledby','controller-guide-title');
  dialog.innerHTML='<header><h2 id="controller-guide-title"></h2><div><button id="controller-zh">中文</button> <button id="controller-en">ENGLISH</button> <button id="controller-zoom"></button> <button id="controller-close"></button></div></header><nav class="controller-toolbar"><button id="controller-prev"></button><select id="controller-page" aria-label="Guide page"></select><button id="controller-next"></button><button id="controller-live"></button></nav><div class="controller-scroll"><img alt=""><section class="controller-live-panel" hidden><div class="live-top"><strong id="live-status"></strong><label><span id="live-device-label"></span> <select id="live-device"></select></label><button id="live-mode"></button></div><p id="live-explanation"></p><div class="live-signals"><article><h3 id="live-ls-title"></h3><div class="stick-pad"><i id="live-ls-dot"></i></div><p id="live-ls-value"></p></article><article><h3 id="live-rs-title"></h3><div class="stick-pad"><i id="live-rs-dot"></i></div><p id="live-rs-value"></p></article><article class="live-triggers"><h3>LT / RT</h3><p id="live-lt-value"></p><div class="trigger-track"><i id="live-lt-fill"></i></div><p id="live-rt-value"></p><div class="trigger-track"><i id="live-rt-fill"></i></div></article></div><div class="live-buttons"></div><p id="live-raw"></p><p id="live-foot"></p></section></div><p class="controller-hint"></p>';
  document.body.append(dialog);
  const $=id=>dialog.querySelector('#'+id),viewport=dialog.querySelector('.controller-scroll'),image=dialog.querySelector('img'),panel=dialog.querySelector('.controller-live-panel'),picker=$('controller-page'),devices=$('live-device');
  const buttonHost=dialog.querySelector('.live-buttons');
  names.forEach((name,i)=>{const button=document.createElement('div');button.className='live-key';button.dataset.index=i;button.textContent=name+' 0.00';buttonHost.append(button);});
  function updateLabels(){
    const t=ui[lang];$('controller-guide-title').textContent=t.title;$('controller-zoom').textContent=t.zoom;$('controller-close').textContent=t.close;$('controller-prev').textContent=t.prev;$('controller-next').textContent=t.next;$('controller-live').textContent=t.live;
    dialog.querySelector('.controller-hint').textContent=t.hint;picker.replaceChildren();
    titles[lang].forEach((title,i)=>{const option=document.createElement('option');option.value=i;option.textContent=title;picker.append(option);});picker.value=selected;
    $('live-device-label').textContent=t.choose;$('live-mode').textContent=demo?t.real:t.demo;$('live-ls-title').textContent=t.left+' / X-Y';$('live-rs-title').textContent=t.right+' / X-Y';$('live-explanation').textContent=demo?t.demoExplain:t.explain;$('live-foot').textContent=t.foot;deviceSignature='';
  }
  function select(index){
    selected=(index+keys.length+1)%(keys.length+1);picker.value=selected;const isLive=selected===keys.length;image.hidden=isLive;panel.hidden=!isLive;viewport.classList.toggle('is-live',isLive);$('controller-zoom').disabled=isLive;
    if(!isLive){image.src='TemplateData/Controllers/p3_'+keys[selected]+'_'+lang+'_v02.png';image.alt=titles[lang][selected];}
    viewport.scrollTo(0,0);
    if(timer){clearInterval(timer);timer=0;}
    if(dialog.open && isLive){tick(performance.now());timer=setInterval(()=>tick(performance.now()),1000/30);}
  }
  function gamepads(){try{return [...(navigator.getGamepads?.()||[])].filter(p=>p?.connected);}catch{return [];}}
  function syncDevices(pads){
    const signature=pads.map(p=>p.index+':'+p.id).join('|')+'|'+lang;
    if(signature===deviceSignature)return;deviceSignature=signature;devices.replaceChildren();
    if(!pads.length){const option=document.createElement('option');option.value=-1;option.textContent=ui[lang].none;devices.append(option);deviceIndex=-1;}
    else{if(!pads.some(p=>p.index===deviceIndex))deviceIndex=pads[0].index;pads.forEach(p=>{const option=document.createElement('option');option.value=p.index;option.textContent=p.id;devices.append(option);});}
    devices.value=deviceIndex;
  }
  function tick(time){
    if(!dialog.open || selected!==keys.length)return;
    if(time-last<25)return;last=time;
    const pads=gamepads();syncDevices(pads);const pad=pads.find(p=>p.index===deviceIndex),phase=time/1000%12;
    const axes=demo?[Math.sin(phase*1.3)*.8,Math.cos(phase*.9)*.6,Math.sin(phase*.7)*.65,Math.cos(phase*1.1)*.7]:[0,1,2,3].map(i=>pad?.axes[i]||0);
    const rawValues=pad?.buttons.map(b=>typeof b==='object'?b.value:b)||[];
    const values=demo?names.map((_,i)=>i===3&&phase>=2&&phase<3||i===2&&phase>=9&&phase<10||i===1&&phase>=10&&phase<11?1:i===6&&phase>=4&&phase<7?.85:i===7&&phase>=8&&phase<9?.9:0):rawValues;
    const t=ui[lang];$('live-status').textContent=demo?t.demoState:(pad?t.realState+' · '+pad.id:t.none);
    for(const [prefix,index] of [['ls',0],['rs',2]]){
      const x=Math.max(-1,Math.min(1,axes[index])),y=Math.max(-1,Math.min(1,axes[index+1]));
      $('live-'+prefix+'-dot').style.left=(50+x*46)+'%';$('live-'+prefix+'-dot').style.top=(50+y*46)+'%';$('live-'+prefix+'-value').textContent='X '+x.toFixed(2)+'   Y '+y.toFixed(2);
    }
    for(const [prefix,i] of [['lt',6],['rt',7]]){const value=values[i]||0;$('live-'+prefix+'-value').textContent=prefix.toUpperCase()+' '+value.toFixed(2);$('live-'+prefix+'-fill').style.width=Math.max(0,Math.min(1,value))*100+'%';}
    const standard=demo||pad?.mapping==='standard';
    [...buttonHost.children].forEach((cell,i)=>{const value=values[i]||0;cell.textContent=(standard?names[i]:'RAW '+String(i).padStart(2,'0'))+' '+value.toFixed(2);cell.classList.toggle('is-held',value>.35);});
    const held=values.map((v,i)=>v>.35?i:null).filter(i=>i!==null);$('live-raw').textContent=t.raw+': '+(held.join(', ')||'--')+(pad&&!standard?(lang==='zh'?' · 非 standard 设备：按原始编号显示':' · Non-standard device: raw indices shown'):'');
  }
  function openGuide(){resume=document.body.classList.contains('is-playing');if(resume){setPaused(true);document.exitPointerLock?.();}updateLabels();dialog.showModal();select(selected);}
  document.querySelectorAll('[data-controller-guide]').forEach(button=>button.addEventListener('click',openGuide));
  $('controller-close').onclick=()=>dialog.close();$('controller-prev').onclick=()=>select(selected-1);$('controller-next').onclick=()=>select(selected+1);$('controller-live').onclick=()=>select(keys.length);
  picker.onchange=()=>select(Number(picker.value));devices.onchange=()=>{deviceIndex=Number(devices.value);};
  $('controller-zh').onclick=()=>{lang='zh';updateLabels();select(selected);};$('controller-en').onclick=()=>{lang='en';updateLabels();select(selected);};
  $('live-mode').onclick=()=>{demo=!demo;updateLabels();};$('controller-zoom').onclick=()=>viewport.classList.toggle('is-zoomed');
  dialog.addEventListener('close',()=>{if(timer)clearInterval(timer);timer=0;if(resume){setPaused(false);canvas.focus();}});
  dialog.addEventListener('keydown',e=>{if((e.key==='ArrowLeft'||e.key==='ArrowRight')&&e.target.tagName!=='SELECT'){e.preventDefault();select(selected+(e.key==='ArrowRight'?1:-1));}});
  updateLabels();
})();
