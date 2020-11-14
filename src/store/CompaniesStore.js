import {action, extendObservable, runInAction} from 'mobx';
import Api from '../services/axios';
import _ from 'lodash';

class CompaniesStore {
  constructor() {
    extendObservable(this, {
      companyList: [],
      companyListByFilter: null,
      companyDetails: {},
      bankList: [],
      bankDetails: {},
      error: '',
      enableFilterCompanies: false,
      filterCompanies: {
        name: {
          filter: false,
          list: [],
        },
        city: {
          filter: false,
          list: [],
        },
        region: {
          filter: false,
          list: [],
        },
        tracks: {
          filter: false,
          list: [],
        },
      },
    });
  }

  @action
  getCompanyList() {
    this.isLoading = true;
    return Api.get('companies/')
      .then(resp => {
        const {data} = resp;

        runInAction(() => {
          this.companyList = data.results;
          this.isLoading = false;
        });
        return data;
      })
      .catch(error => {
        runInAction(() => {
          this.isLoading = false;
          this.error = error.message;
        });
      });
  }

  @action
  getCompanyDetails(id) {
    this.isLoading = true;
    return Api.get(`companies/${id}`)
      .then(resp => {
        const {data} = resp;

        runInAction(() => {
          this.companyDetails = data;
        });
        return data;
      })
      .catch(error => {
        runInAction(() => {
          this.error = error.message;
        });
      });
  }

  @action
  createCompany(details) {
    return Api.post('companies/', details)
      .then(resp => {
        const {data} = resp;
        this.getCompanyList();
        return data;
      })
      .catch(error => {
        return Promise.reject(error.response.data);
      });
  }

  @action
  deleteCompany(id) {
    return Api.delete(`companies/${id}/`)
      .then(resp => {
        const {data} = resp;
        this.getCompanyList();
        return data;
      })
      .catch(error => {
        return Promise.reject(error.response.data);
      });
  }

  @action
  updateCompany(id, newData) {
    return Api.put(`companies/${id}/`, newData)
      .then(resp => {
        const {data} = resp;
        this.getCompanyDetails(id);
        return data;
      })
      .catch(error => {
        return Promise.reject(error.response.data);
      });
  }

  @action
  bankDetailListForCompany(id) {
    return Api.get(`companies/${id}/bank_details`)
      .then(resp => {
        const {data} = resp;

        runInAction(() => {
          this.bankList = data.results;
        });
        return data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  @action
  addBankDetail(companyId, bankDetails) {
    return Api.post(`companies/${companyId}/bank_details/`, bankDetails)
      .then(resp => {
        const {data} = resp;

        this.bankDetailListForCompany(companyId);
        return data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  @action
  updateBankDetail(companyId, bankDetails) {
    return Api.put(`companies/${companyId}/bank_details/${bankDetails.id}/`, bankDetails)
      .then(resp => {
        const {data} = resp;

        this.bankDetailListForCompany(companyId);
        return data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  @action
  deleteBankDetail(companyId, bankDetails) {
    return Api.delete(`companies/${companyId}/bank_details/${bankDetails.id}/`, bankDetails)
      .then(resp => {
        const {data} = resp;

        this.bankDetailListForCompany(companyId);
        return data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  @action
  setFilter(value, typeFilter) {
    const re = new RegExp(_.escapeRegExp(value), 'i');
    const currentFilter = this.filterCompanies[typeFilter];

    const isMatch = result => {
      if (typeFilter === 'name') {
        return re.test(result.name);
      }
      if (typeFilter === 'city') {
        return re.test(result.city);
      }
      if (typeFilter === 'region') {
        return re.test(result.region);
      }
      return re.test(result.tracks);
    };

    currentFilter.filter = !!value;

    if (currentFilter.filter) {
      currentFilter.list = _.filter(this.companyList, isMatch);
    } else {
      currentFilter.list = [];
    }

    this.filter(typeFilter, !currentFilter.filter);
  }

  @action
  filter(type, remove) {
    let resultFilter = [];
    const allFilter = [];
    let count = 0;
    this.enableFilterCompanies = true;

    Object.keys(this.filterCompanies).forEach((item, i) => {
      const filter = this.filterCompanies[item];
      if (filter.list.length > 0) {
        // eslint-disable-next-line no-plusplus
        count++;
        allFilter.push(filter.list);
      }
    });

    if (this.filterCompanies[type].filter && count === 1) {
      resultFilter = this.filterCompanies[type].list;
    } else {
      if (count === 0) {
        if (type === 'name' || type === 'city') {
          if (remove) {
            resultFilter = this.companyList;
          } else {
            resultFilter = _.intersectionBy(this.companyList, allFilter[0], 'id');
          }
        } else {
          resultFilter = this.companyList;
        }
      }
      if (count === 1) {
        resultFilter = _.intersectionBy(this.companyList, allFilter[0], 'id');
      }
      if (count === 2) {
        resultFilter = _.intersectionBy(this.companyList, allFilter[0], allFilter[1], 'id');
      }
      if (count === 3) {
        resultFilter = _.intersectionBy(this.companyList, allFilter[0], allFilter[1], allFilter[2], 'id');
      }
      /*
      if (count === 4) {
        resultFilter = _.intersectionBy(
          this.agenda,
          this.filterAgenda.search.list,
          this.filterAgenda.date.list,
          this.filterAgenda.type.list,
          this.filterAgenda.tracks.list,
          'id',
        );
      }
      */
    }

    this.companyListByFilter = resultFilter;
  }

  @action
  resetFilter() {
    this.enableFilterCompanies = false;
  }

  @action
  reset() {
    this.companyDetails = {};
  }

  @action
  cleanError() {
    this.error = '';
  }
}

export default new CompaniesStore();
