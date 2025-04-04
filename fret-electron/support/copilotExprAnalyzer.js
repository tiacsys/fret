// Copyright © 2025, United States Government, as represented by the Administrator of the National Aeronautics and Space Administration. All rights reserved.
// 
// The “FRET : Formal Requirements Elicitation Tool - Version 3.0” software is licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0. 
// 
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
const CopilotExpressionsListener = require('./CopilotParser/CopilotParserListener').CopilotParserListener;
const AntlrUtilities = require('../app/parser/AntlrUtilities').AntlrUtilities;
const utilities = require('../support/utilities');

const antlrUtilities = new AntlrUtilities();

var internalVariables = [];

function copilotExprAnalyzer() {
  CopilotExpressionsListener.call(this);
  return this;
}

copilotExprAnalyzer.prototype = Object.create(CopilotExpressionsListener.prototype);
copilotExprAnalyzer.prototype.constructor = copilotExprAnalyzer;

copilotExprAnalyzer.prototype.exitStreamIdent = function(ctx) {
    var variable = antlrUtilities.getText(ctx);
    if (variable && ! internalVariables.includes(variable))
      internalVariables.push(variable);
};

copilotExprAnalyzer.prototype.variables = () => {
  return internalVariables;
}

copilotExprAnalyzer.prototype.clearVariables = () => {
  internalVariables = [];
}


exports.copilotExprAnalyzer = copilotExprAnalyzer;
