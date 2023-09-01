define("dashboard/NumericDashboard", [
  "underscore", "jquery", "wrm/context-path",
], (_, $, contextPath) => {

  class NumericDashboard {

    constructor(API) {
      this.API = API;
      this.preferences = {};
      this.searchUrl = `${contextPath()}/rest/api/2/search`;
    }


    // Fetch API
    requestData = function (query) {
      return $.ajax({
        method: "GET",
        url: contextPath() + `/rest/api/2/${query}`
      });
    };
    

    //final page....
    async render(context, preferences) {
      if (this.preventRerender) {
        this.preventRerender = false;
        return;
      }

      const loadRender = async (html) => {
        this.$div = $(context);
        this.$div.hide();
        this.API.showLoadingBar();
        await this.$div.empty().html(`${tailwind()}${html}`).promise();
        await this.$div.show().promise();
        this.API.hideLoadingBar();
        this.API.resize();
      }

      this.requestData(`search?jql=project=${preferences.id}`).done(function (data) {
        const total = data.total;
        const issues = data.issues;
        if (total <= 0) {
          loadRender(errorHTML(`Theres'nt issues to load on [${preferences.project}] project.`))
        }

        let finalData = []
        //X
        issues.map(issue => {
          let value = issue.fields[preferences.x_id];
          if (value == null) {
            value = { name: 'unassigned', displayName: 'unassigned' }
          }
          const data = { name: value.displayName, data: 0 }
          let isAdded = false;
          finalData.map(item => {
            if (item != null && item.name === data.name) {
              isAdded = true;
            }
          })
          if (!isAdded) {
            finalData.push(data)
          }
        })
        //Y
        issues.map(issue => {
          let valueX = issue.fields[preferences.x_id]
          if (valueX == null) valueX = { displayName: 'unassigned' }
          let valueY = issue.fields[preferences.y_id];
          if (valueY == null) valueY = 0;
          console.log(valueX.displayName + " " + valueY);
          finalData.map(item => {
            if (item.name === valueX.displayName) {
              item.data += valueY;
            }
          })
        })
        preferences.table_data = finalData;
        loadRender(savedHtml(preferences))
      });

    }



    //Edit page....
    async renderEdit(context, preferences) {

      // #1 creating context
      this.$element = $(context);
      // #2 metodh to reload the screens
      const loadScreen = async (html) => {
        await this.$element.empty().html(`${tailwind()}${html}`).promise();
        this.API.resize();
        //drop
        const $drop = $("aui-item-link.testing", this.$element);
        $drop.click(async (event) => {
          form[event.currentTarget.id].select = event.currentTarget.innerText;
          loadScreen(configHtml(form))
        });
        const $save = $("button.save", this.$element);
        $save.click(async (event) => {
          event.preventDefault();
          userOptions.project = form.row1.select;
          //getting the ID
          form.row1.data.map(item => {
            if (item.name === userOptions.project) {
              userOptions.id = item.key;
            }
          })
          //getting ID select
          let id1 = '';
          form.row2.data.map(item => {
            if (item.name === form.row2.select) {
              id1 = item.id;
            }
          })
          //getting X
          userOptions.x_name = form.row2.select;
          form.row2.data.map(item => {
            if (item.name === form.row2.select) {
              userOptions.x_id = item.id;
            }
          })
          //getting Y
          userOptions.y_name = form.row3.select;
          form.row3.data.map(item => {
            if (item.name === form.row3.select) {
              userOptions.y_id = item.id;
            }
          })
          this.API.showLoadingBar();
          await this.API.savePreferences({ ...preferences, ...userOptions });
          this.API.hideLoadingBar();
        });
      }
      // starting .....
      this.API.showLoadingBar();
      var self = this;
      // loading screen
      loadScreen(configHtml(form))


      this.requestData("field").done(function (data) {
        const userField = data.filter(item => item.schema != null && item.schema.type === 'user');
        userField.sort((a, b) => a.name.localeCompare(b.name));

        const nummberField = data.filter(item => item.schema != null && item.schema.type === 'number');
        nummberField.sort((a, b) => a.name.localeCompare(b.name));

        form.row2.data = userField;
        form.row3.data = nummberField;

        loadScreen(configHtml(form))
      });
      this.requestData("project").done(function (data) {
        form.row1.data = data;
        loadScreen(configHtml(form))
      });
      self.API.hideLoadingBar();
      this.API.once("afterRender", this.API.resize);
    }
  }

  return NumericDashboard;
});