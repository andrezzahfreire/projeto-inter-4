let enviando = false;

function exibirMensagem(mensagem) {
	document.getElementById("mensagem").textContent = mensagem;
}

async function enviarGet(caminho) {
	if (enviando)
		return;

	exibirMensagem("Enviando...");

	try {
		let response = await fetch(caminho);
		let texto = await response.text();

		if (!response.ok) {
			exibirMensagem(`Erro ${response.status} 😢: ${texto}`);
		} else {
			exibirMensagem("Enviado! 😊");
		}
	} catch (ex) {
		exibirMensagem("Exceção 😳: " + (ex.message || ex.toString()));
	} finally {
		enviando = false;
	}
}

(function () {
	let tmp = document.createElement("div");
	tmp.innerHTML = `
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" />
		<style>
			html, body {
				min-height: 100vh;
				height: 100vh;
			}
			body {
				background-color: #000;
				color: #fff;
			}
			img {
				max-width: 100%;
				display: block;
				margin: 0 auto;
			}
		</style>
		<div class="container-fluid text-center h-100 d-flex flex-column">
			<div class="my-3">
				<div>
					<img width="200" src="https://raw.githubusercontent.com/tech-espm/misc-template/main/logo.png" />
				</div>
				<div>
					<img width="200" src="https://raw.githubusercontent.com/tech-espm/misc-template/main/logo-si-512.png" />
				</div>
				<h1 class="my-3">Controle Remoto</h1>
				<p class="m-0" id="mensagem">&nbsp;</p>
			</div>
			<div class="row" style="flex: 1 1 auto;">
				<div class="col-8 d-flex flex-column justify-content-center">
					<div>
						<div>
							<button type="button" class="btn btn-lg btn-primary" onclick="enviarGet('/movimento?v=_0100000!')">
								<i class="fas fa-fw fa-angle-up"></i>
							</button>
						</div>
						<div>
							<button type="button" class="btn btn-lg btn-success" onclick="enviarGet('/movimento?v=_0100270!')">
								<i class="fas fa-fw fa-angle-left"></i>
							</button><button type="button" class="btn btn-lg btn-secondary" onclick="enviarGet('/movimento?v=_0000000!')">
								<i class="fas fa-fw fa-stop"></i>
							</button><button type="button" class="btn btn-lg btn-warning" onclick="enviarGet('/movimento?v=_0100090!')">
								<i class="fas fa-fw fa-angle-right"></i>
							</button>
						</div>
						<div>
							<button type="button" class="btn btn-lg btn-danger" onclick="enviarGet('/movimento?v=_0100180!')">
								<i class="fas fa-fw fa-angle-down"></i>
							</button>
						</div>
					</div>
				</div>
				<div class="col-4 d-flex flex-column justify-content-center">
					<div>
						<button type="button" class="btn btn-lg btn-light" onclick="enviarGet('/leitura')">
							Ação
						</button>
					</div>
				</div>
			</div>
		</div>
	`;

	while (tmp.firstChild) {
		let c = tmp.firstChild;
		tmp.removeChild(c);
		document.body.appendChild(c);
	}
})();
