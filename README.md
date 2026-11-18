Hola, soy Jonathan Nuñez. Este es mi proyecto final: un Registro de Ventas en Solana usando Rust y Anchor.

[Muestra tu archivo lib.rs]
Tomé el proyecto guiado y le agregué esta mejora funcional: una validación que exige que la cantidad de la venta sea mayor a cero usando require!. Si alguien intenta registrar una venta en ceros, lanza el error personalizado CantidadInvalida que definí aquí abajo.

[Muestra tu archivo anchor.test.ts]
Aquí están las pruebas configuradas para validar una venta de 150 y rechazar la de cero dólares.

[Dale click al botón del martillo (Build) para que salga el texto verde abajo]
Como pueden ver en la consola, el código compila perfectamente sin errores. Lamentablemente, debido a la caída global de los faucets de Devnet el día de hoy, no me es posible fondear la wallet para hacer el Deploy y correr el Test en vivo, pero el contrato y las pruebas están listos. Gracias.
