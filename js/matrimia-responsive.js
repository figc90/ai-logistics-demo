(()=>{
 const sidebar=document.querySelector('aside.std-sidebar,aside.sidebar');if(!sidebar)return;
 const body=document.body;body.classList.add('mia-responsive-app');
 const mobile=matchMedia('(max-width:900px)');sidebar.id ||= 'miaAppNavigation';
 const button=document.createElement('button');button.type='button';button.className='mia-mobile-menu';button.textContent='☰ Menu';button.setAttribute('aria-label','Apri il menu di navigazione');button.setAttribute('aria-controls',sidebar.id);button.setAttribute('aria-expanded','false');
 const shade=document.createElement('button');shade.type='button';shade.className='mia-menu-shade';shade.setAttribute('aria-label','Chiudi il menu');shade.tabIndex=-1;body.append(shade);
 const header=document.querySelector('.app-topbar,.topbar');
 if(header)header.prepend(button);else{button.classList.add('fallback');const main=document.querySelector('.app-main,.main,main');(main||body).prepend(button)}
 let previousFocus=null;
 function close(restore=true){body.classList.remove('mia-menu-open');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Apri il menu di navigazione');sidebar.inert=mobile.matches;if(restore&&previousFocus?.isConnected)previousFocus.focus()}
 function open(){previousFocus=document.activeElement;sidebar.inert=false;body.classList.add('mia-menu-open');button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Chiudi il menu di navigazione');sidebar.querySelector('a,button')?.focus()}
 button.onclick=()=>body.classList.contains('mia-menu-open')?close():open();shade.onclick=()=>close();
 sidebar.addEventListener('click',e=>{if(e.target.closest('a')&&mobile.matches)close(false)});
 document.addEventListener('keydown',e=>{if(!body.classList.contains('mia-menu-open'))return;if(e.key==='Escape'){e.preventDefault();close();return}if(e.key==='Tab'){const nodes=[...sidebar.querySelectorAll('a[href],button,input')].filter(n=>!n.disabled&&n.getClientRects().length);if(!nodes.length)return;const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 mobile.addEventListener('change',()=>close(false));close(false);
})();
