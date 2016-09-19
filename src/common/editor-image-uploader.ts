/**
 * Created by KIMSEONHO on 2016-09-19.
 */
import {MultipartItem} from "./multipart-upload/multipart-item";
import {MultipartUploader} from "./multipart-upload/multipart-uploader";
import { contentHeaders } from './headers';
import { config } from './config';

/**
 * Send Image File to Server(Summernote) - Singleton임.
*/
export class EditorImageUploader {
  private static _instance:EditorImageUploader = new EditorImageUploader();

  private uploader:MultipartUploader;
  private multipartItem:MultipartItem;
  private editor:any;

  public upload : (files:File[], editor:any) => void;

  constructor() {
    if(EditorImageUploader._instance){
      throw new Error("Error: Instantiation failed: Use EditorImageUploader.getInstance() instead of new.");
    }
    EditorImageUploader._instance = this;

    let URL = [config.serverHost, config.editorImageUploadURL].join('/');
    this.uploader = new MultipartUploader({url: URL});
    this.multipartItem = new MultipartItem(this.uploader);
    this.multipartItem.headers = contentHeaders;
    this.multipartItem.withCredentials = false;

    this.upload = (files:File[], editor:any) => {
      console.debug("EditorImageUploader.ts & upload() ==>");
      if (null == files){
        console.error("EditorImageUploader.ts & upload() form invalid.");
        return;
      }
      if (this.multipartItem == null){
        this.multipartItem = new MultipartItem(this.uploader);
      }
      if (this.multipartItem.formData == null)
        this.multipartItem.formData = new FormData();

      for (var file of files) {
        this.multipartItem.formData.append("editorImage", file);
      }
      this.editor = editor;

      this.multipartItem.callback = (data) => {
        console.debug("EditorImageUploader.ts & uploadCallback() ==>");

        if (this.multipartItem.isSuccess){
          let res = JSON.parse(data);

          for (var imageURL of res.imagePaths) {
            this.editor.insertImage([config.serverHost, imageURL].join('/'));   // editor를 변수로 받으면 undefined로 나온다.
            // 나중에 bind나 apply로 넘기자.
          }

          console.debug("EditorImageUploader.ts & uploadCallback() upload file success.");
        } else {
          console.error("EditorImageUploader.ts & uploadCallback() upload file false.");
        }
      };

      this.multipartItem.upload();
    }
  }

  public static getInstance():EditorImageUploader {
    return EditorImageUploader._instance;
  }
}
