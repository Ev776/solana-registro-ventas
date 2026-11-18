# Registro de Ventas - Solana Advanced Bootcamp

**Autor:** Jonathan Issau Nuñez Hernandez
**Ruta elegida:** Proyecto guiado con una mejora funcional.

## Mejora Implementada
Se tomó el template base del Registro de Ventas y se agregó una validación de negocio en la instrucción `registrar_venta`. 
Se utilizó la macro `require!(cantidad > 0, ErrorCode::CantidadInvalida)` para evitar que se registren ventas con valor de 0. Si esto ocurre, la transacción se revierte y devuelve un error personalizado.

## Estado de Ejecución (Nota sobre Devnet)
El código fuente compila exitosamente (`Build successful`) y las pruebas unitarias en TypeScript (chai/assert) están configuradas para validar tanto el caso de éxito como el error personalizado. 
Debido a la caída global actual de los Faucets de Solana en la red Devnet, el despliegue final (`Deploy`) se encuentra bloqueado por falta de fondos de prueba (Error 410: RPC faucet is closed), pero la lógica del contrato inteligente está completa y validada en compilación.
