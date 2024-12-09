// implement your own methods in here, if your data is coming from A rest API

import * as User from "./user"
import * as Activity from "./activity"
import * as Chat from "./chat"
import * as Global from "./variables"
import * as Files from "./file"
import * as Mail from "./mail"
import * as Post from "./post"
import * as Chart from "./chart"
import * as Project from "./project"
export default {
  // user
  getUser: User.getUser,
  getUserById: User.getUserById,
  // project
  getProject: Project.getProject,
  // activity
  getActivity: Activity.default.getActivity,
  // post
  getPost: Post.getPost,
  // chat
  getChatMenu: Chat.Menu,
  getChatGroup: Chat.Groups,
  getChatGroupById: Chat.getChatById,
  // FIle
  getFile: Files.getFile,
  getFileMenu: Files.getFileMenu,
  // mail
  getMail: Mail.getMail,
  getMailMenu: Mail.MailMenu,
  getMailById: Mail.getMailById,
  getMailByType: Mail.getMailByType,
  // chart data
  getMonthVisit: Chart.monthVisitData,
  getBaseURL: Global.base_url,
  getClient: Global.client_id,
  getClientPass: Global.client_pass,
  getCookie: Global.getCookie,
  setCookie: Global.setCookie,
  deleteCookie: Global.deleteCookie,
  tokenCookie: Global.tokenCookie,
  userCookie: Global.userCookie,
  accCookie: Global.accCookie,
  getLoader: Global.loaderStyle,
  getAuth: Global.getAuth,
  checkContact: Global.checkContact,
  getLoaderColor: Global.loaderColor,
  getCampaign: Chart.campaignData,
  getLocation: Chart.locationData,
  encryptData: Global.encryptData,
  showPayment: Global.showPayment
}
