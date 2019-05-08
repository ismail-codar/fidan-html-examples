import "../../_examples";
import { html, value, inject } from "@fidanjs/runtime";
import Button, { ButtonProps } from "@material-ui/core/Button";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { DialogProps } from "@material-ui/core/Dialog";
import DialogTitle, { DialogTitleProps } from "@material-ui/core/DialogTitle";
import * as React from "react";
import { reactToDom, domToReact } from "@fidanjs/integration-react";
import { TestReact } from "./test.react";

const dialogProps: DialogProps = inject({ open: false });

const app = html`
  <div>
    app
    <hr />
    ${reactToDom(TestReact, {})}
    ${reactToDom<DialogProps>(
      Dialog,
      dialogProps,
      React.createElement(DialogTitle, {}, "Use Google's location service?"),
      React.createElement(
        DialogContent,
        {},
        React.createElement(
          DialogContentText,
          {},
          domToReact(html`
            <i style="background-color: red"
              >Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </i>
          `)
        )
      ),
      React.createElement(
        DialogActions,
        {},
        React.createElement(
          Button,
          {
            color: "primary",
            onClick: e => {
              dialogProps.open = false;
            }
          },
          "Agree"
        )
      )
    )}
    ${reactToDom<ButtonProps>(
      Button,
      {
        variant: "contained",
        color: "primary",
        onClick: e => {
          dialogProps.open = true;
        }
      },
      "Open alert dialog"
    )}
  </div>
`;
document.getElementById("main").appendChild(app);
