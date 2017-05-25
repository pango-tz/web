import { Injectable, Inject } from '@angular/core';
import { BASE_API_HREF } from '../tokens';
import { AuthHttp, JwtHelper} from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Response, RequestMethod, RequestOptionsArgs, Headers } from '@angular/http';
import { ErrorResponse } from '../models';

@Injectable()
export abstract class BaseService<IRequest, IResponse> {

  readonly jwtHelper: JwtHelper = new JwtHelper();

  constructor(@Inject(BASE_API_HREF) protected apiUrl: string, protected http: AuthHttp) { }

  /**
   * Returns the endpoint url for this call. This string can have replacement variables in the form of:
   * ${index} where index is a zero based number and must be inclusive from zero to n - 1. For example if we have an endpoint:
   * groups/${0}/message/${1} in the doRequest method you would pass an array of two strings and or numbers
   */
  abstract getEndpointUrl(): string;

  /**
   * Returns the the constructed url
   */
  getUrl(url: string) {
    return `${this.apiUrl}${url}`;
  }

  getUserReferenceId(): string {
    return localStorage.getItem('userReferenceId');
  }
  /**
   * Returns the final built url based on the array of arguments.
   * If the endpoint url is 'groups/${0}/messages/${1}' then the array ['my-group', 1231231 ]
   * will create the url => 'groups/my-group/messages/1231231
   *
   * @param urlReplacementArgs - the args to replace the placeholders in the string.
   *
   */
  getRequestedUrl(...urlReplacementArgs: Array<any>): string {

    let url = this.getEndpointUrl();

    if (urlReplacementArgs !== null && urlReplacementArgs !== undefined ) {
      urlReplacementArgs.forEach( (arg: any, index: number) => {
        url = url.replace('${' + index + '}', arg);
      });
    }
    return this.getUrl(url);
  }

  getHeaderUserReferenceIdHeader( userReferenceId: string) {
    return new Headers({userReferenceId: userReferenceId});
  }

  configureHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
    const userReferenceId = this.getUserReferenceId();

    if ( userReferenceId) {
      if (options && options.headers) {
        options.headers.set('userReferenceId', userReferenceId);
      } else {
        options = {
          headers: this.getHeaderUserReferenceIdHeader(userReferenceId)
        };
      }
    }

    return options;
  }

  doRequest(
    method: RequestMethod,
    body?: IRequest,
    options?: RequestOptionsArgs,
    ...urlReplacementArgs: Array<any>): Observable<IResponse>  {

    options = this.configureHeaders(options);

    const url = this.getRequestedUrl(urlReplacementArgs);

    switch (method) {
      case RequestMethod.Get:
        return this.http.get(url, options).map( (response) => this.handleResponse(response)).catch(this.handleError).share();
      case RequestMethod.Post:
        return this.http.post(url, body, options).map((response) => this.handleResponse(response)).catch(this.handleError).share();
      case RequestMethod.Put:
        return this.http.put(url, body, options).map((response) => this.handleResponse(response)).catch(this.handleError).share();
      case RequestMethod.Delete:
        return this.http.delete(url, options).map((response) => this.handleResponse(response)).catch(this.handleError).share();
      case RequestMethod.Head:
        return this.http.head(url, options).map((response) => this.handleResponse(response)).catch(this.handleError).share();
      case RequestMethod.Patch:
        return this.http.patch(url, body, options).map((response) => this.handleResponse(response)).catch(this.handleError).share();
      case RequestMethod.Options:
        return this.http.options(url, options).map((response) => this.handleResponse(response)).catch(this.handleError).share();
    }

    return Observable.throw(new Error('Please supply a RequestMethod in order to make a call'));

  }

  transformFromDashToCamelCase(value: string): string {
    const values: string[] = value.split('-');

    let newValue = '';

    values.forEach((element: string, index: number) => {
      if (index !== 0) {
        newValue += element.toUpperCase();
      } else {
        newValue += element;
      }
    });

    return newValue;
  }

  getBody(body: any) {
    if (typeof body === 'object' && body['user-token']) {
      body['userToken'] = body['user-token'];
      delete body['user-token'];
    }
    return body;
  }

  handleResponse(response: Response) {

    if ( response.ok ) {
      const body = this.getBody(response.json());

      return body || {};
    } else {
      Observable.throw(this.handleError(response.json()));
    }

  }

  handleError(error: Response | any ) {
    const theError = error.json();
    return Observable.throw(theError);
  }

}

