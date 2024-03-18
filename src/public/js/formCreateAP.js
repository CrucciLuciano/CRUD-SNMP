$(document).ready(function () {
    $("#form-productos").on("submit", function (event) {
        event.preventDefault(); // Evite el envío predeterminado del formulario

        // Recopile los datos del formulario
        var datosFormulario = {
            node: $("#node").val(),
            ip: $("#ip").val(),
            technology: $("#technology").val(),
            serviceMax: $("#serviceMax").val()
        };
        // Envíe los datos al backend usando AJAX
        $.ajax({
            url: "http://localhost:8080/netSNMP/createAP", // Reemplace con la URL real de su endpoint backend
            type: "POST", // Establezca el método HTTP en POST
            dataType: "json", // Formato de datos esperado del backend
            data: datosFormulario, // Los datos del formulario a enviar
            success: function (respuesta) {
                // Maneje el envío exitoso (por ejemplo, muestre un mensaje de éxito)
                console.log("Datos enviados con éxito:", respuesta);
            },
            error: function (error) {
                // Maneje los errores (por ejemplo, muestre un mensaje de error)
                console.error("Error al enviar datos:", error);
            }
        });
    });
});
