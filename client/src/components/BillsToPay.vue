<template>
  <div class="container">
    <h1>Contas a pagar</h1>
    <hr/>
    <div class="row mt-5">
      <div class="col-12 col-lg-3">
        <label for="name" class="form-label">Nome</label>
        <input id="name" type="text" v-model="name" class="form-control" placeholder="Nome" aria-label="Nome">
      </div>
      <div class="col-12 col-lg-3">
        <label for="name" class="form-label">Valor Original</label>
        <input type="number" v-model="original_value" class="form-control" placeholder="Valor Original" aria-label="Valor Original">
      </div>
      <div class="col-12 col-lg-3">
        <label for="name" class="form-label">Data de Vencimento</label>
        <input class="form-control" v-model="duedate" type="date" placeholder="Data de vencimento" aria-label="Data de vencimento">
      </div>
      <div class="col-12 col-lg-3">
        <label for="name" class="form-label">Data de Pagamento</label>
        <input class="form-control" v-model="payday" type="date" placeholder="Data de pagamento" aria-label="Data de pagamento">
      </div>
    </div>
    <div class="row mt-5">
      <button type="button" @click="createBill" class="btn btn-primary btn-lg custom-btn">Cadastrar</button>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Valor original</th>
        <th scope="col">Valor corrigido</th>
        <th scope="col">Quantidade de dias de atraso</th>
        <th scope="col">Data de vencimento</th>
        <th scope="col">Data de pagamento</th>
        <th scope="col">Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="billToPay in billsToPay" :key="billToPay.id">
        <td>{{ billToPay.name }}</td>
        <td>{{ formatPrice(billToPay.original_value) }}</td>
        <td>{{ formatPrice(billToPay.fixed_value) }}</td>
        <td>{{ billToPay.days_delayed }}</td>
        <td>{{ dateTime(billToPay.duedate) }}</td>
        <td>{{ dateTime(billToPay.payday) }}</td>
        <td><button type="button" @click="deleteBill(billToPay.id)" class="btn btn-danger">Excluir</button></td>
      </tr>
      </tbody>
    </table>
    <h4 v-if="billsToPay.length == 0" class="text-center no-results">Nenhum registro encontrado.</h4>
  </div>
</template>

<script>

import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';

export default {
  name: "BillsToPay",
  data() {
    return {
      billsToPay: [],
      original_value: '',
      name: '',
      duedate: '',
      payday: '',
    };
  },
  props: {
    msg: String
  },
  mounted () {
    this.getBills();
  },
  methods: {
    getBills() {
      this.axios
          .get(process.env.VUE_APP_API_URL + ':' + process.env.NODE_APP_SERVER_PORT + '/contasapagar', {headers: {
              "content-type": "application/json",
            }})
          .then(response => (this.fillBillsToPay(response.data)));
    },
    fillBillsToPay(data) {
      this.billsToPay = data
    },
    formatPrice(value) {
      let formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      });
      return formatter.format(value);
    },
    dateTime(value) {
      return moment(value).format('DD/MM/YYYY');
    },
    deleteBill(id) {
      let result = confirm("Deseja realmente excluir esse registro?");
      if (result == true) {
        this.axios.delete(process.env.VUE_APP_API_URL + '/contasapagar/' + id)
            .then(() => {
              this.getBills();
            })
            .catch((err) => {
              console.log("AXIOS ERROR: ", err);
            })
        alert('Item excluído com sucesso');
      }
    },
    createBill() {
      if(this.validData()) {
        let data = {
          name: this.name,
          original_value: this.original_value.replace(',','.'),
          duedate: this.duedate,
          payday: this.payday,
        }
        this.axios.post(process.env.VUE_APP_API_URL + '/contasapagar', data, {headers: {
            "content-type": "application/json",
          }})
            .then(() => {
              this.getBills();
            })
            .catch((err) => {
              console.log("AXIOS ERROR: ", err);
            })
      }
    },
    validData () {
      if(this.name == '') {
        alert('Campo nome é obrigatório.');
        return false;
      }
      if(this.original_value == '') {
        alert('Campo Valor original é obrigatório');
        return false;
      }
      if(this.duedate == '') {
        alert('Campo Data de Vencimento é obrigatório');
        return false;
      }
      if(this.payday == '') {
        alert('Campo Data de Pagamento é obrigatório');
        return false;
      }
      if(moment(this.payday) < moment(this.duedate)) {
        alert('A data de pagamento não pode ser menor que a data de vencimento.');
        return false;
      }
      return true;
    }
  },
}
</script>
<style scoped>
  .table {
    margin-top: 10%;
  }
  .custom-btn {
    width: 30%;
    margin: 0 auto;
  }
  .no-results {
    width: 30%;
    margin: 0 auto;
  }
</style>
