export class Factura {
    public total: number = 0;
    public num_articulos;
    public listaArticulos = [];
    public si: String = 'No existe el articulo';

    addNuevoArticulo(price: number, nombreArticulo: String, unidades: number){
        let nuevoArticulo = {};
        nuevoArticulo = {
            'nombre': nombreArticulo,
            'precioUnitario': price,
            'unidades': unidades,
            'sub_total': unidades * price
        }
        if (localStorage.getItem('articulos') === null) {
            this.listaArticulos.push(nuevoArticulo);
            localStorage.setItem('articulos', JSON.stringify(this.listaArticulos));
        }else if (localStorage.getItem('articulos') !== null) {
            this.listaArticulos = [];
            this.listaArticulos = JSON.parse(localStorage.getItem('articulos'));
            this.listaArticulos.push(nuevoArticulo);
            localStorage.setItem('articulos', JSON.stringify(this.listaArticulos));
        }
    }

    getCoot() {
        if (localStorage.getItem('articulos') !== null) {
            this.total = 0;
            const localStor = JSON.parse(localStorage.getItem('articulos'));
            for (let i = 0; i < localStor.length; i++) {
                this.total += localStor[i].sub_total;
            }
            return this.total;
        }
        
    }

    getNumArticulos() {
        if (localStorage.getItem('articulos') === null) {
            this.num_articulos = 0;
            return this.num_articulos;
        }else {
            const json = JSON.parse(localStorage.getItem('articulos'));
            if (json.length > 0) {
                this.num_articulos = json.length;
                return this.num_articulos;
            }
        }
    }

    getDetails() {
        if (localStorage.getItem('articulos') !== null) {
            this.listaArticulos = [];
            this.listaArticulos = JSON.parse(localStorage.getItem('articulos'));
            return this.listaArticulos;
        }else {
            return 0;
        }
    }

    deleteCot() {
        localStorage.clear();
    }

}