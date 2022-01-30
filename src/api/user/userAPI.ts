import BaseService from "../../service/base";

class UserService extends BaseService {
  
  private readonly GET_USER_LIST_URL: string = '';

  async getUserList(params: any){
    return await this.doGetRequest(`/${this.GET_USER_LIST_URL}`, params)
  }
}

export default new UserService;