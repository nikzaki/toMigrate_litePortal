import {fakeAsync, inject, TestBed, tick} from '@angular/core/testing';
import {ConfigurationService} from './configuration.service';
import {HttpModule, RequestMethod, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
const mockConfig = {
  serverRoot: 'http://golflet.mygolf2u.com'
};
describe('ConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports  : [HttpModule],
      providers: [
        {
          provide : XHRBackend,
          useClass: MockBackend
        },
        ConfigurationService]
    });
  });
  it('Config load test...', fakeAsync(inject([XHRBackend, ConfigurationService],
      (mockBackend: MockBackend, service: ConfigurationService) => {
        const expectedUrl = 'config/configuration.json';
        expect(service).toBeTruthy();

        mockBackend.connections.subscribe((connection: MockConnection)=>{
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe(expectedUrl);
          connection.mockRespond(new Response(
              new ResponseOptions({ body: mockConfig })
          ));
        });
        service.load().then((result)=>{
          // console.log("Result " + result);
          expect(result).toBeTruthy();
        }).catch(()=>{
          fail();
        });
        tick(10000);
        expect(service.getConfig()).toBeTruthy();
        expect(service.getConfig()).toEqual(mockConfig);
      })));

  it('Derive Url...', fakeAsync(inject([XHRBackend, ConfigurationService],
      (mockBackend: MockBackend, service: ConfigurationService) => {
        const expectedUrl = 'config/configuration.json';
        expect(service).toBeTruthy();

        mockBackend.connections.subscribe((connection: MockConnection)=>{

          connection.mockRespond(new Response(
              new ResponseOptions({ body: mockConfig })
          ));
        });
        service.load().then((result)=>{
          expect(result).toBeTruthy();
        }).catch(()=>{
          fail();
        });
        tick(1000);
        expect(service.getConfig()).toBeTruthy();
        expect(service.getConfig()).toEqual(mockConfig);
        expect(service.getRestApiUrl('/player/get'))
            .toEqual(mockConfig.serverRoot+'/rest/player/get');

        let testObj = {
          photo: 'document/contacts/test.png'
        };
        service.deriveFulImageURL(testObj, ['photo']);
        expect(testObj.photo).toEqual(mockConfig.serverRoot + '/document/contacts/test.png');

      })));

});
