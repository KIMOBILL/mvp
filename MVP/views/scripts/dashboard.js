function fillSelects(data) {
    var period = [];
    var agencia = [];
    var canal = [];
    var area = [];
    var indicador = [];

    data.forEach(element => {
        agencia.push(element.Agencia);
        area.push(element.Area);
        canal.push(element.Canal);
        period.push(element.Periodo);
        indicador.push(element.Indicador);
    });

    let resultagencia = agencia.filter((item, index) => {
        return agencia.indexOf(item) === index;
    })

    let resultarea = area.filter((item, index) => {
        return area.indexOf(item) === index;
    })

    let resultcanal = canal.filter((item, index) => {
        return canal.indexOf(item) === index;
    })

    let resultperiodo = period.filter((item, index) => {
        return period.indexOf(item) === index;
    })

    let resultindicador = indicador.filter((item, index) => {
        return indicador.indexOf(item) === index;
    })

    return [resultagencia,resultarea,resultcanal,resultperiodo,resultindicador];
}