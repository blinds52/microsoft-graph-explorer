// ------------------------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.  See License in the project root for license information.
// ------------------------------------------------------------------------------

import { Component, Input } from '@angular/core';
import { GraphApiCall } from "./base";
import { GraphExplorerComponent } from "./GraphExplorerComponent";
import { getString } from "./api-explorer-helpers";
import { AppModule } from "./app.module";
import { getShortQueryText } from "./ApiCallDisplayHelpers";

@Component({
  selector: 'query-row',
  template: `
    <button class="api-query" (click)="loadQueryIntoEditor(query)" onclick="this.blur();" (keydown)="queryKeyDown($event)" [attr.title]="getTitle()" [ngClass]="{restrict: (!isAuthenticated() && query.method != 'GET')}" tabindex="0">
        <div class="row-1">
            <method-badge [query]="query"></method-badge>
            <span class="query">{{getQueryText()}}</span>
            <a onclick="this.blur();" class="query-link" *ngIf="query.docLink" [attr.href]="query.docLink" [attr.title]="query.docLink" target="_blank">
                <i class="ms-Icon ms-Icon--Page"></i>
            </a>
            <div onclick="this.blur();" class="query-link restrict" *ngIf="query.method != 'GET' && !isAuthenticated()" [attr.title]="getStr('Login to try this request')">
                <i class="ms-Icon ms-Icon--Permissions"></i>
            </div>

        </div>
      <ng-content></ng-content>
    </button>
    `,
    styles: [`
      .api-query:hover, .c-drawer>button:hover, .api-query:focus, .c-drawer>button:focus, .query-link:focus {
          background: rgba(0,0,0,0.25);
          outline: none;
      }

      .query-link {
            background: #2F2F2F;
            padding: 8px 11px 7px 12px;
            float: right;
            margin: -5px;
            margin-left: 5px;
      }

      .query-link:hover + .query-link {
          background-color: rgb(35, 35, 35);
      }

      .query-link:hover {
          background: rgba(0,0,0,0.25);
          cursor: pointer;
      }

      .restrict:hover {
        cursor: not-allowed;
      }

      .api-query {
          cursor: pointer;
          font-size: 13px;
          line-height: 16px;
          display: block;
          border: 0;
          background: 0 0;
          font-weight: 500;
          padding: 5px 5px 5px 12px;
          left: 0;
          text-align: left;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: -12px;
      }

      .row-1 {
          display: inline;
      }

    .duration {
        float: right;
    }

    i.ms-Icon.ms-Icon--Page {
    }


`]
})
export class QueryRowComponent extends GraphExplorerComponent {
    @Input() query: GraphApiCall;

    queryKeyDown(event) {
        if (event.keyCode == 13)
            this.loadQueryIntoEditor(this.query)
    }

    getTitle() {
        return this.query.requestUrl;
    }

    getQueryText() {
        return getShortQueryText(this.query);
    }
}