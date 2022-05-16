function embed(id_cuenta) {

    var url = 'https://hiringroom.com/api/vacancies/get_vacancy_list?jsoncallback=?';
    if (id_cuenta == '5acf96bf03c2645d43c1de69') {
        var label = 'Ver cargo';
    } else {
        var label = 'Ver vacante';
    }
    $.getJSON(url, { cuenta: id_cuenta, vacancies: { benefits: false } })
        .done(function(result) {
            debugger;
            $.getJSON('https://idearhumano.hiringroom.com/jobs/get_vacancy/62751b8371927f0a81dc2b5b', { cuenta: id_cuenta })
                .done(function(result) {

                    debugger;
                });
            var it = result.vacancies.filter(s => s.descript.includes('#B&uacute;squedasIT'));

            // $("head").append("<link href='https://hiringroom.com/assets/css/api/embed.css' rel='stylesheet' type='text/css'/>");
            $.each(result.vacancies, function(i, v) {
                var div = '#embeded_code'
                if (v.descript.includes('#B&uacute;squedasIT')) {
                    div = '#embeded_code1'
                }

                $(div).append(
                    "<li class='microsite_vacancy'><h3 class='microsite_title'>" + v.name + "</h3>" +
                    "<ul class='microsite_datas'>" +
                    "<li class='data_location'><strong>Lugar:</strong> " + v.locality + "</li>" +
                    "<li class='data_desc'><strong>Descripcion:</strong> " + v.descript.slice(0, 200) + "... <a  href='https://" + v.link + "' target='_blank'>Seguir leyendo</a> </li>" +
                    // "<li class='data_req'><strong>Requerimientos:</strong> " + v.requirements + "</li>" +
                    // "<li class='data_benefits'><strong>Beneficios:</strong> " + v.benefits + "</li>" +
                    // "<li class='data_details'><strong>Detalles:</strong> " + v.details + "</li>" +
                    "<li class='data_link'><a class='btn' href='https://" + v.link + "' target='_blank'>" + label + "</a><a class='btn'  href='https://" + v.form_link + "' target='_blank'>Postularme</a></li>" +

                    "</ul>" +
                    "</li>"
                );
            });
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
        });
}