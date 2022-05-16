function embed(id_cuenta) {
  var url =
    "https://hiringroom.com/api/vacancies/get_vacancy_list?jsoncallback=?";
  if (id_cuenta == "5acf96bf03c2645d43c1de69") {
    var label = "Ver cargo";
  } else {
    var label = "Ver vacante";
  }
  $.getJSON(url, { cuenta: id_cuenta })
    .done(function (result) {
      debugger;
      const vacancias = result.vacancies.reduce((acc, vacancy) => {
        const key = vacancy.locality ? vacancy.locality : "other";
        const accumulador = acc[key] ? acc[key] : [];
        return {
          ...acc,
          [key]: [...accumulador, vacancy],
        };
      }, {});

      const tabs = Object.keys(vacancias);

      $("#embeded_code").append(
        `

<ul class="nav nav-tabs" id="myTab" role="tablist">
            ${tabs.reduce(
              (acc, tab, currentIndex) =>
                (acc += `<li class="nav-item" role="presentation">
                <a href="#${
                  "t" + currentIndex
                }" class="nav-link active tabs-ih" id="t${currentIndex}-tab" data-bs-toggle="tab" data-bs-target="#t${currentIndex}" type="button" role="tab" aria-controls="t${currentIndex}" aria-selected="true">${tab}</a>
                </li>`),
              ""
            )}
            </ul>
            <div class="tab-content" id="myTabContent">
            
            ${tabs.reduce(
              (acc, tab, currentIndex) =>
                (acc += `<div class="tab-pane fade show tab-content-ih" id="t${currentIndex}-tabC" role="tabpanel" aria-labelledby="t${currentIndex}-tab">
                <ul>
                ${vacancias[tab].reduce(
                  (html, v) =>
                    (html +=
                      "<li class='microsite_vacancy'><h3 class='microsite_title'>" +
                      v.name +
                      "</h3>" +
                      "<ul class='microsite_datas'>" +
                      "<li class='data_location'><strong>Lugar:</strong> " +
                      v.locality +
                      "</li>" +
                      "<li class='data_desc'><strong>Descripcion:</strong> " +
                      v.descript.slice(0, 200) +
                      "... <a  href='https://" +
                      v.link +
                      "' target='_blank'>Seguir leyendo</a> </li>" +
                      // "<li class='data_req'><strong>Requerimientos:</strong> " + v.requirements + "</li>" +
                      // "<li class='data_benefits'><strong>Beneficios:</strong> " + v.benefits + "</li>" +
                      // "<li class='data_details'><strong>Detalles:</strong> " + v.details + "</li>" +
                      "<li class='data_link'><a class='btn' href='https://" +
                      v.link +
                      "' target='_blank'>" +
                      label +
                      "</a><a class='btn'  href='https://" +
                      v.form_link +
                      "' target='_blank'>Postularme</a></li>" +
                      "</ul>" +
                      "</li>"),

                  ""
                )}
                </ul>
            </div>
            `),
              ""
            )}
            
            </div>
`
      );
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });
}
