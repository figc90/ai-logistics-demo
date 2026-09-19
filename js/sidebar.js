(async function(){

  const container =
  document.getElementById(
    "sidebarContainer"
  );

  if(!container){

    console.warn(
      "sidebarContainer non trovato."
    );

    return;
  }


  try{

    /* =========================
       CARICA SIDEBAR
    ========================= */

    const response =
    await fetch(
      "components/sidebar.html",
      {
        cache:"no-cache"
      }
    );

    if(!response.ok){

      throw new Error(
        "Impossibile caricare sidebar.html"
      );
    }


    const html =
    await response.text();


    container.innerHTML =
    html;


    /* =========================
       PAGINA ATTIVA
    ========================= */

    let currentPage =
    window.location.pathname
      .split("/")
      .pop();


    if(!currentPage){

      currentPage =
      "dashboard.html";
    }


    const menuItems =
    container.querySelectorAll(
      "[data-page]"
    );


    menuItems.forEach(
      item=>{

        const pages =
        String(
          item.dataset.page || ""
        )
        .split(",")
        .map(
          page =>
          page.trim()
        );


        if(
          pages.includes(
            currentPage
          )
        ){

          item.classList.add(
            "active"
          );

        }

      }
    );


    /* =========================
       LINK DISABILITATI
    ========================= */

    const disabledItems =
    container.querySelectorAll(
      '[data-disabled="true"]'
    );


    disabledItems.forEach(
      item=>{

        item.addEventListener(
          "click",
          event=>{

            event.preventDefault();

          }
        );

      }
    );


    /* =========================
       EVENTO SIDEBAR PRONTA
    ========================= */

    /*
     * La pagina principale potrà
     * ascoltare questo evento per
     * inserire email utente e logout.
     */

    window.dispatchEvent(
      new CustomEvent(
        "matrimia:sidebar-ready"
      )
    );


  }
  catch(error){

    console.error(
      "Errore caricamento sidebar:",
      error
    );


    container.innerHTML =
    `
      <aside class="sidebar">
        <div style="
          padding:20px;
          color:white;
          font-size:12px;
        ">
          Errore caricamento menu
        </div>
      </aside>
    `;

  }

})();
