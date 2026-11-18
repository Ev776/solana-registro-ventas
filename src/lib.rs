use anchor_lang::prelude::*;

declare_id!("F64uViSVhSiTHpVcfgT62bw6ut7cdocUAiPER9PzK3qo");

#[program]
pub mod registro_ventas {
    use super::*;

    pub fn registrar_venta(
        ctx: Context<RegistrarVenta>,
        nombre_articulo: String,
        cantidad: u64,
    ) -> Result<()> {
        // Validamos que la cantidad de la venta sea mayor a 0. Si es 0, la transacción falla.
        require!(cantidad > 0, ErrorCode::CantidadInvalida);

        // Guardamos los datos de la venta
        let venta = &mut ctx.accounts.venta;
        venta.vendedor = ctx.accounts.vendedor.key();
        venta.nombre_articulo = nombre_articulo;
        venta.cantidad = cantidad;

        msg!("¡Venta registrada exitosamente por {}!", cantidad);
        Ok(())
    }
}

// Estructura que define qué cuentas necesitamos para registrar una venta
#[derive(Accounts)]
pub struct RegistrarVenta<'info> {
    #[account(
        init, 
        payer = vendedor, 
        space = 8 + 32 + 40 + 8 // Espacio en memoria para la cuenta
    )]
    pub venta: Account<'info, Venta>,
    #[account(mut)]
    pub vendedor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Estructura de la cuenta donde se guardan los datos
#[account]
pub struct Venta {
    pub vendedor: Pubkey,
    pub nombre_articulo: String,
    pub cantidad: u64,
}

// Catálogo de errores personalizados
#[error_code]
pub enum ErrorCode {
    #[msg("Error de negocio: La cantidad de la venta no puede ser cero.")]
    CantidadInvalida,
}
