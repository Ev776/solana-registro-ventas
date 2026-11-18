import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import * as assert from "assert";

describe("registro_ventas", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.RegistroVentas as Program<any>;

  it("Prueba 1: Registra una venta exitosamente (Cantidad > 0)", async () => {
    const ventaKeypair = anchor.web3.Keypair.generate();

    await program.methods
      .registrarVenta("Curso de Desarrollo", new anchor.BN(150))
      .accounts({
        venta: ventaKeypair.publicKey,
        vendedor: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([ventaKeypair])
      .rpc();

    const ventaGuardada = await program.account.venta.fetch(ventaKeypair.publicKey);
    assert.equal(ventaGuardada.nombreArticulo, "Curso de Desarrollo");
    assert.equal(ventaGuardada.cantidad.toNumber(), 150);
    console.log("Venta de $150 registrada con éxito.");
  });

  it("Prueba 2: Falla al registrar una venta de $0 (Mejora funcional)", async () => {
    const ventaKeypair = anchor.web3.Keypair.generate();

    try {
      await program.methods
        .registrarVenta("Articulo de Regalo", new anchor.BN(0))
        .accounts({
          venta: ventaKeypair.publicKey,
          vendedor: provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([ventaKeypair])
        .rpc();
      
      assert.fail("La transacción debió fallar pero no lo hizo.");
    } catch (err) {
      assert.match(err.message, /CantidadInvalida/);
      console.log("Validación exitosa: El sistema bloqueó la venta de $0.");
    }
  });
});