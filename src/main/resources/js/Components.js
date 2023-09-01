const tailwind = () => {
    return ` <head>
<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script type="text/javascript">
AJS.$(window).load(function() {
  AJS.$('.gadget-inline').css("height", "450px");
});
</script>
</head>
`};

//------------------>  ITEMS <------------------

const button = (row) => {
    return `
      <div class="w-full flex justify-center mt-2">
        <button type="button"
          class="save hover:animate-pulse text-gray-900 bg-gray-100 hover:bg-gray-200 font-medium rounded-br-lg text-sm px-4 py-2 border text-center inline-flex items-center hover:transition-all hover:duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mx-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
          </svg>
          <p class="uppercase">${row.name}</p>
        </button>
      </div>`
}

const dropRow = (row) => {
    return `<div class="w-full text-sm mx-2 flex p-2 group">
                <div class="w-full hover:bg-gray-100 flex p-2">
                <div class="w-2/6 flex">
                <div class="self-center capitalize">${row.name}:</div>
                <div class="mx-1 text-red-500 self-center">${row.mandatory ? `*` : ''}</div>
                </div>
                <!-- drop menu -->
                  <div class="flex-1">
                  <button class="aui-button aui-dropdown2-trigger w-4/6" aria-controls="example-dropdown-${row.key}">
                 ${row.select}
              </button>
              <aui-dropdown-menu id="example-dropdown-${row.key}">
              ${Object.keys(row.data).length > 0 ? row.data.map(x => `<aui-item-link class="testing text-gray-400" id="${row.key}">${x.name}</aui-item-link>`).join('') : ''}
              </aui-dropdown-menu>
                  </div>
                  </div>
        </div>
   `
}
const inputLabel = (name, text) => {
    return `
    <div class="w-full bg-gray-100 flex justify-center opacity-30 hover:opacity-100 duration-300">
          <div class="">
              <span class="text-sm mx-1">${text}</span> 
              <input type="text" id="${name}" name="${name}" class="px-2 py-1 border rounded m-2 text-xs ${name}">
          </div> 
      </div>
    `
}
//------------------>  SCREENS <------------------
const configHtml = (form) =>
    `
    <div class="w-full  bg-gray-100 flex justify-center">
    <div
        class="group w-3/5 bg-white hover:bg-gray-50 m-1 mt-3 rounded border border-gray-0 drop-shadow-lg hover:transition-all hover:duration-500 hover:ease-in-out">
        <!-- title -->
        <div class="w-full flex">
            <div class="self-center m-2 group-hover:animate-spin"><svg xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
            <div class="mt-1 font-semibold text-xl uppercase self-center">${form.title}</div>
        </div>
        <!-- labels row -->
        <div class="mt-2">
        ${dropRow(form.row0)}
        ${dropRow(form.row1)}
        ${dropRow(form.row2)}
        ${inputLabel("input1", "User field description")}
        ${dropRow(form.row3)}
        ${inputLabel("input2", "Numeric field description")}
        ${button(form.row4)}
        </div>
        <!-- buttom    -->
        <div class=" w-full">
            <br>
        </div>
    </div>
  </div>`;

const savedHtml = (userOptions) => {
    return `
  <div class="w-full h-[450px]">
    <div class="w-full bg-indigo-50">
        <p class="w-full text-center text-xl font-bold">${userOptions.project}</p>
        <!-- y axix -->
        <div class="w-full h-[450px] flex">
            <div class="w-[30px] flex">
                <span
                    class="cursor-default [writing-mode:vertical-lr] rotate-180 m-2 text-center hover:bg-indigo-100 hover:rounded duration-300  hover:bg-opacity-50 text-xs">
                    Your Y text goes here
                </span>
            </div>
            <div class="w-full m-3">
                <!-- X axix -->
                <div
                    class="cursor-default m-2 text-center hover:bg-indigo-100 hover:rounded duration-300 hover:bg-opacity-50 text-xs">
                    <p> Your X text goes here</p>
                </div>
                <!-- table -->
                <div class="rounded text-dark w-full h-full rounded-2 drop-shadow-md overflow-y-scroll">
                    <div class="text-black flex justify-center">
                        <table class="w-full p-2 m-2 cursor-default rounded drop-shadow-md ">
                            <tr class="bg-stone-300  hover:bg-stone-400 mb-2 text-md" >
                                ${userOptions.table_data.map(item => `<th>${item.name}</th>`).join('')}
                            </tr>
                            <tr class="w-full bg-stone-100 hover:bg-indigo-100 text-sm">
                                ${userOptions.table_data.map(item => `<td class="px-2 py-1 ">${item.data}</td>`).join('')}
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- footer -->
    </div>
  </div>
    `
}
const loadingHTML = (message) => {
    return `<p class="bg-purple-500 rounded p-2 m-2 text-white text center ">${message}</p>`
}
const errorHTML = (message) => {
    return `<p class="bg-red-500 rounded p-2 m-2 text-white text center ">${message}</p>`
}