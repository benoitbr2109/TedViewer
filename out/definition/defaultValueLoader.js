"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSON_DEFINITION = void 0;
exports.JSON_DEFINITION = '{"definitions": {\
    "concepts": {\
      "total": 12,\
      "items": [\
        {\
          "name": "AccountEntry",\
          "root": false,\
          "properties": [\
            {\
              "name": "DisplayString",\
              "type": "Text"\
            },\
            {\
              "name": "AnalysisDate",\
              "type": "DD/MM/YYYY",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "01/01/2021"\
            },\
            {\
              "name": "EntryDate",\
              "type": "DD/MM/YYYY",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "01/01/2021"\
            },\
            {\
              "name": "Amount",\
              "type": "Number"\
            },\
            {\
              "name": "TechnicalDate",\
              "type": "DD/MM/YYYY",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "01/01/2021"\
            },\
            {\
              "name": "SequenceNbr",\
              "type": "Number"\
            },\
            {\
              "name": "CalculationReference",\
              "type": "TEXT"\
            },\
            {\
              "name": "DeclarantQuality",\
              "type": "TEXT"\
            },\
            {\
              "name": "IsUnderCuratorship",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "name": "IsAtFault",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "name": "IsFromFcf",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "name": "EntryStatus",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "ADDED"\
            },\
            {\
              "name": "OperationalStatus",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "ON_LINE"\
            },\
            {\
              "name": "RscCode",\
              "type": "TEXT"\
            },\
            {\
              "name": "ActNr",\
              "type": "TEXT"\
            },\
            {\
              "name": "SuiteNr",\
              "type": "TEXT"\
            },\
            {\
              "name": "PotAccountStatementDate",\
              "type": "DD/MM/YYYY"\
            },\
            {\
              "name": "EntryCategory",\
              "type": "TEXT"\
            }\
          ],\
          "children": [\
            "Transfer"\
          ],\
          "tables": [\
            {\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_ACCOUNT_ENTRY"\
            },\
            {\
              "db": "ATCE",\
              "table": "K"\
            }\
          ],\
          "businessMappings": [\
            {\
              "property": "DisplayString",\
              "db": "ATCE",\
              "table": "K",\
              "column": "KREF",\
              "converter": "ENTRY_DISPLAY_STRING_TO_LEGACY_ENTRY"\
            },\
            {\
              "property": "DisplayString",\
              "db": "ATCE",\
              "table": "K",\
              "column": "KAARDREF",\
              "converter": "ENTRY_DISPLAY_STRING_TO_AARDREF"\
            },\
            {\
              "property": "DD/MM/YYYY_TO_CYYDDD(TechnicalDate) || SequenceNbr",\
              "db": "ATCE",\
              "table": "K",\
              "column": "KDATMEC",\
              "converter": "EXPRESSION"\
            },\
            {\
              "property": "TechnicalDate",\
              "db": "ATCE",\
              "table": "K",\
              "column": "KDATMAJ",\
              "converter": "DD/MM/YYYY_TO_CYYDDD"\
            },\
            {\
              "property": "TechnicalDate",\
              "db": "ATCE",\
              "table": "K",\
              "column": "KDATAN",\
              "converter": "DD/MM/YYYY_TO_CYYDDD"\
            },\
            {\
              "property": "DisplayString",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "REF_ENTRY_TYPE_ID",\
              "converter": "ENTRY_DISPLAY_STRING_TO_REF_ENTRY_TYPE_ID"\
            },\
            {\
              "property": "Amount",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "AMOUNT"\
            },\
            {\
              "property": "Amount",\
              "db": "ATCE",\
              "table": "K",\
              "column": "KMONTANT"\
            },\
            {\
              "property": "EntryDate",\
              "db": "ATCE",\
              "table": "K",\
              "column": "KDATECR",\
              "converter": "DD/MM/YYYY_TO_CYYMMDD"\
            },\
            {\
              "property": "SequenceNbr",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "MEC_SEQUENCE_NR"\
            },\
            {\
              "property": "AnalysisDate",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "ANALYSIS_DATE",\
              "converter": "DD/MM/YYYY_TO_DATE"\
            },\
            {\
              "property": "TechnicalDate",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "TECHNICAL_DATE",\
              "converter": "DD/MM/YYYY_TO_DATE"\
            },\
            {\
              "property": "EntryDate",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "ENTRY_DATE",\
              "converter": "DD/MM/YYYY_TO_DATE"\
            },\
            {\
              "property": "CalculationReference",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "CALCULATION_REFERENCE"\
            },\
            {\
              "property": "PotAccountStatementDate",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "POT_ACCOUNT_STATEMENT_DATE",\
              "converter": "DD/MM/YYYY_TO_DATE"\
            },\
            {\
              "property": "IsUnderCuratorship",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "IS_UNDER_CURATORSHIP"\
            },\
            {\
              "property": "DeclarantQuality",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "DECLARANT_QUALITY"\
            },\
            {\
              "property": "IsAtFault",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "IS_AT_FAULT"\
            },\
            {\
              "property": "IsFromFcf",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "IS_FROM_FCF"\
            },\
            {\
              "property": "EntryStatus",\
              "db": "ACROSS",\
              "table": "EASY_H_ACCOUNT_ENTRY",\
              "column": "ENTRY_STATUS"\
            },\
            {\
              "property": "OperationalStatus",\
              "db": "ACROSS",\
              "table": "EASY_H_ACCOUNT_ENTRY",\
              "column": "OPERATIONAL_STATUS"\
            }\
          ],\
          "technicalMappings": [\
            {\
              "db": "ATCE",\
              "table": "K",\
              "column": "KCODDC",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "ENTRY_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ATCE",\
              "table": "K",\
              "column": "KCODREF",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "5"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_ACCOUNT_ENTRY",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_ACCOUNT_ENTRY",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_ACCOUNT_ENTRY",\
              "column": "H_ENTRY_ID",\
              "generator": "SEQUENCE"\
            }\
          ],\
          "referencedConcepts": [\
            {\
              "referencedConcept": "ContributionGroup",\
              "referenceName": "ContributionGroup",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_ACCOUNT_ENTRY",\
                  "column": "ENTRY_GROUP_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_CONTRIBUTION_GROUP",\
                  "referencedColumn": "ENTRY_GROUP_ID"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "K",\
                  "column": "KGROUP",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "J",\
                  "referencedColumn": "JGROUP"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "K",\
                  "column": "KKWART",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "J",\
                  "referencedColumn": "JKWART"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "K",\
                  "column": "KMATR",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "J",\
                  "referencedColumn": "JMATR"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "K",\
                  "column": "KPERIOD",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "J",\
                  "referencedColumn": "JPERIOD"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "AccountEntry",\
              "referenceName": "AccountEntry",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_H_ACCOUNT_ENTRY",\
                  "column": "ENTRY_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_ACCOUNT_ENTRY",\
                  "referencedColumn": "ENTRY_ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "BusinessEvent",\
              "referenceName": "BusinessEvent",\
              "useAncestor": false,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_H_ACCOUNT_ENTRY",\
                  "column": "BUSS_EVENT_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "COM_BUSINESS_EVENT",\
                  "referencedColumn": "BUSS_EVENT_ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "StandardEvent",\
              "referenceName": "StandardEvent",\
              "useAncestor": false,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_H_ACCOUNT_ENTRY",\
                  "column": "SUB_EVENT_ID",\
                  "referencedDb": "SPINE",\
                  "referencedTable": "EVENT",\
                  "referencedColumn": "EVENT_ID"\
                }\
              ]\
            }\
          ]\
        },\
        {\
          "name": "Ensemble",\
          "root": false,\
          "properties": [\
            {\
              "name": "CaseId",\
              "type": "NUMBER"\
            },\
            {\
              "name": "CaseResponseStatus",\
              "type": "Text",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "SENT_BY_DSP"\
            },\
            {\
              "name": "PlanStatus",\
              "type": "Text",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "ACTIVE"\
            },\
            {\
              "name": "PlanNumber",\
              "type": "Number",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "name": "CaseResponseType",\
              "type": "Text",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "GRANT"\
            }\
          ],\
          "children": [\
            "AdministrativeAgreement",\
            "AmicablePaymentPlan",\
            "RecoveryEvent"\
          ],\
          "tables": [\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN"\
            }\
          ],\
          "businessMappings": [\
            {\
              "property": "CaseId",\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "CASE_ID"\
            },\
            {\
              "property": "PlanStatus",\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "STATUS"\
            },\
            {\
              "property": "PlanNumber",\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "PNUMBER"\
            },\
            {\
              "property": "CaseResponseStatus",\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "STATUS"\
            },\
            {\
              "property": "CaseResponseType",\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "CRSP_TYPE"\
            }\
          ],\
          "technicalMappings": [\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "NSSO_REF",\
              "generator": "RANDOM_STRING",\
              "generatorProperty": "10"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "PRODUCER_REF",\
              "generator": "RANDOM_STRING",\
              "generatorProperty": "10"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "RESPONSE_NR",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "LAST_UPDATE_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "CREATION_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "CREATION_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "PRODUCER_REF",\
              "generator": "RANDOM_STRING",\
              "generatorProperty": "10"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "LAST_UPDATE_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "CREATION_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "LAST_UPDATE_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "CREATION_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "LAST_UPDATE_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "PMTEXT_TYPE",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "PAYMENT_PLAN"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "ID",\
              "generator": "SEQUENCE"\
            }\
          ],\
          "referencedConcepts": [\
            {\
              "referencedConcept": "Account",\
              "referenceName": "Account",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ATCE",\
                  "table": "CASE_REQUEST",\
                  "column": "MATR_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "PAYMENT_EXTENSION",\
                  "column": "MATR_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "PAYMENT_PLAN",\
                  "column": "MATR_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "Ensemble",\
              "referenceName": "Ensemble",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ATCE",\
                  "table": "CASE_RESPONSE",\
                  "column": "REQUEST_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "CASE_REQUEST",\
                  "referencedColumn": "ID"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "PAYMENT_EXTENSION",\
                  "column": "REQUEST_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "CASE_REQUEST",\
                  "referencedColumn": "ID"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "PAYMENT_PLAN",\
                  "column": "PMTEXT_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "PAYMENT_EXTENSION",\
                  "referencedColumn": "ID"\
                }\
              ]\
            }\
          ]\
        },\
        {\
          "name": "AmicablePaymentPlan",\
          "root": false,\
          "properties": [\
            {\
              "name": "PlanStatus",\
              "type": "Text",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "ACTIVE"\
            },\
            {\
              "name": "CaseResponseType",\
              "type": "Text",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "GRANT"\
            },\
            {\
              "name": "PlanNumber",\
              "type": "Number",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "name": "CaseResponseStatus",\
              "type": "Text",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "SENT_BY_DSP"\
            },\
            {\
              "name": "CreationDate",\
              "type": "DD/MM/YYYY",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "01/01/2021"\
            },\
            {\
              "name": "CaseId",\
              "type": "NUMBER"\
            }\
          ],\
          "children": [\
            "Period",\
            "Term"\
          ],\
          "tables": [\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN"\
            }\
          ],\
          "businessMappings": [\
            {\
              "property": "CaseResponseStatus",\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "STATUS"\
            },\
            {\
              "property": "CreationDate",\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "CREATED_ON",\
              "converter": "DD/MM/YYYY_TO_DATE"\
            },\
            {\
              "property": "CaseResponseType",\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "CRSP_TYPE"\
            },\
            {\
              "property": "PlanStatus",\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "STATUS"\
            },\
            {\
              "property": "PlanNumber",\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "PNUMBER"\
            },\
            {\
              "property": "CaseId",\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "CASE_ID"\
            }\
          ],\
          "technicalMappings": [\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "NSSO_REF",\
              "generator": "RANDOM_STRING",\
              "generatorProperty": "10"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "PRODUCER_REF",\
              "generator": "RANDOM_STRING",\
              "generatorProperty": "10"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "RESPONSE_NR",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "CREATION_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "LAST_UPDATE_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "CREATION_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "LAST_UPDATE_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "CREATION_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_PLAN",\
              "column": "LAST_UPDATE_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "CREATION_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_RESPONSE",\
              "column": "LAST_UPDATE_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "CASE_REQUEST",\
              "column": "PRODUCER_REF",\
              "generator": "RANDOM_STRING",\
              "generatorProperty": "10"\
            },\
            {\
              "db": "ATCE",\
              "table": "PAYMENT_EXTENSION",\
              "column": "PMTEXT_TYPE",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "SUB_PAYMENT_PLAN"\
            }\
          ],\
          "referencedConcepts": [\
            {\
              "referencedConcept": "Account",\
              "referenceName": "Account",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ATCE",\
                  "table": "CASE_REQUEST",\
                  "column": "MATR_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "PAYMENT_EXTENSION",\
                  "column": "MATR_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "PAYMENT_PLAN",\
                  "column": "MATR_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "Ensemble",\
              "referenceName": "Ensemble",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ATCE",\
                  "table": "PAYMENT_PLAN",\
                  "column": "PARENT_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "PAYMENT_PLAN",\
                  "referencedColumn": "ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "AmicablePaymentPlan",\
              "referenceName": "AmicablePaymentPlan",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ATCE",\
                  "table": "PAYMENT_PLAN",\
                  "column": "PMTEXT_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "PAYMENT_EXTENSION",\
                  "referencedColumn": "ID"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "CASE_RESPONSE",\
                  "column": "REQUEST_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "CASE_REQUEST",\
                  "referencedColumn": "ID"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "PAYMENT_EXTENSION",\
                  "column": "REQUEST_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "CASE_REQUEST",\
                  "referencedColumn": "ID"\
                }\
              ]\
            }\
          ]\
        },\
        {\
          "name": "StandardEvent",\
          "root": false,\
          "properties": [\
            {\
              "name": "EventType",\
              "type": "Varchar",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "BROL"\
            }\
          ],\
          "children": [],\
          "tables": [\
            {\
              "db": "SPINE",\
              "table": "EVENT"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT_LINK"\
            }\
          ],\
          "businessMappings": [\
            {\
              "property": "EventType",\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "EVENT_TYPE"\
            }\
          ],\
          "technicalMappings": [\
            {\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "EVENT_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT_LINK",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT_LINK",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT_LINK",\
              "column": "LINK_TYPE",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "PARENT"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT_LINK",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "APPLICATION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "APPLICATION"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "INSTIGATOR",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "SYSTEM"\
            }\
          ],\
          "referencedConcepts": [\
            {\
              "referencedConcept": "BusinessEvent",\
              "referenceName": "BusinessEvent",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "SPINE",\
                  "table": "EVENT_LINK",\
                  "column": "SOURCE_EVENTID",\
                  "referencedDb": "SPINE",\
                  "referencedTable": "EVENT",\
                  "referencedColumn": "EVENT_ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "Party",\
              "referenceName": "Party",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "SPINE",\
                  "table": "EVENT",\
                  "column": "PARTY_ID",\
                  "referencedDb": "PARTY",\
                  "referencedTable": "NPTY_PARTY",\
                  "referencedColumn": "PARTY_ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "StandardEvent",\
              "referenceName": "StandardEvent",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "SPINE",\
                  "table": "EVENT_LINK",\
                  "column": "DESTINATION_EVENTID",\
                  "referencedDb": "SPINE",\
                  "referencedTable": "EVENT",\
                  "referencedColumn": "EVENT_ID"\
                }\
              ]\
            }\
          ]\
        },\
        {\
          "name": "ContributionGroup",\
          "root": false,\
          "properties": [\
            {\
              "name": "DeclarationDueDate",\
              "type": "DD/MM/YYYY"\
            },\
            {\
              "name": "OperationalStatus",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "ON_LINE"\
            },\
            {\
              "name": "ExpectedDeclarationCount",\
              "type": "Number",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "name": "InterestsReduction",\
              "type": "Number"\
            },\
            {\
              "name": "PaymentDueDate",\
              "type": "DD/MM/YYYY"\
            },\
            {\
              "name": "PaymentDueDateCode",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "name": "DueDate",\
              "type": "DD/MM/YYYY HH:mm:ss"\
            },\
            {\
              "name": "GroupStatus",\
              "type": "Text",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "ADDED"\
            },\
            {\
              "name": "CovidLastIdentificationTms",\
              "type": "DD/MM/YYYY HH:mm:ss"\
            },\
            {\
              "name": "CovidCode",\
              "type": "Number",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "name": "DisplayString",\
              "type": "Text"\
            },\
            {\
              "name": "ExpectedDeclarationDefinitive",\
              "type": "Boolean",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "name": "ExpectedUnmonitoredDclCount",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "name": "BlockingCode",\
              "type": "TEXT"\
            },\
            {\
              "name": "PPSPEtat",\
              "type": "TEXT"\
            },\
            {\
              "name": "PPETat",\
              "type": "TEXT"\
            },\
            {\
              "name": "IncreasesBalance",\
              "type": "NUMBER"\
            },\
            {\
              "name": "InterestsBalance",\
              "type": "NUMBER"\
            },\
            {\
              "name": "ContributionBalance",\
              "type": "NUMBER"\
            },\
            {\
              "name": "CreatedDate",\
              "type": "DD/MM/YYYY",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "01/02/2022"\
            },\
            {\
              "name": "PPNUM",\
              "type": "NUMBER"\
            },\
            {\
              "name": "PPSPNUM",\
              "type": "NUMBER"\
            },\
            {\
              "name": "NumberDeclarationIntroduced",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            }\
          ],\
          "children": [\
            "AccountEntry"\
          ],\
          "tables": [\
            {\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY_GROUP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_CONTRIBUTION_GROUP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_CONTRIBUTION_GROUP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_CONTRIB_GROUP_INTER"\
            },\
            {\
              "db": "ACROSS",\
              "table": "LEGACY_CONTRIBUTION_GRP_LINK"\
            },\
            {\
              "db": "ACROSS",\
              "table": "RECO_CONTRIBUTION_PROPERTIES"\
            },\
            {\
              "db": "ACROSS",\
              "table": "RECO_CONTRIB_PROPERTIES_INTER"\
            },\
            {\
              "db": "ATCE",\
              "table": "J"\
            },\
            {\
              "db": "ATCE",\
              "table": "JT",\
              "conditions": [\
                {\
                  "type": "NOT_EXIST",\
                  "parameters": "JTKWART,JTMATR"\
                }\
              ]\
            }\
          ],\
          "businessMappings": [\
            {\
              "property": "DisplayString",\
              "db": "ACROSS",\
              "table": "EASY_CONTRIBUTION_GROUP",\
              "column": "CALC_BASE_ID",\
              "converter": "CONTRIB_DISPLAY_STRING_TO_CALC_BASE_ID"\
            },\
            {\
              "property": "InterestsReduction",\
              "db": "ACROSS",\
              "table": "RECO_CONTRIBUTION_PROPERTIES",\
              "column": "INTERESTS_REDUCTION"\
            },\
            {\
              "property": "DisplayString",\
              "db": "ACROSS",\
              "table": "EASY_CONTRIBUTION_GROUP",\
              "column": "REF_GROUP_TYPE_ID",\
              "converter": "CONTRIB_DISPLAY_STRING_TO_REF_GROUP_TYPE_ID"\
            },\
            {\
              "property": "DisplayString",\
              "db": "ACROSS",\
              "table": "EASY_CONTRIBUTION_GROUP",\
              "column": "ENTRY_GROUP_SEQUENCE_ID",\
              "converter": "CONTRIB_DISPLAY_STRING_TO_ENTRY_GROUP_SEQUENCE_ID"\
            },\
            {\
              "property": "DisplayString",\
              "db": "ACROSS",\
              "table": "LEGACY_CONTRIBUTION_GRP_LINK",\
              "column": "JKWART",\
              "converter": "CONTRIB_DISPLAY_STRING_TO_LEGACY_QUARTER"\
            },\
            {\
              "property": "DisplayString",\
              "db": "ACROSS",\
              "table": "LEGACY_CONTRIBUTION_GRP_LINK",\
              "column": "JPERIOD",\
              "converter": "CONTRIB_DISPLAY_STRING_TO_LEGACY_PERIOD"\
            },\
            {\
              "property": "DeclarationDueDate",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JDELAIDMF",\
              "converter": "DD/MM/YYYY_TO_CYYMMDD"\
            },\
            {\
              "property": "CovidLastIdentificationTms",\
              "db": "ACROSS",\
              "table": "RECO_CONTRIB_PROPERTIES_INTER",\
              "column": "COVID_LAST_IDENTIFICATION_TMS",\
              "converter": "DD/MM/YYYY HH:mm:ss_TO_DATE"\
            },\
            {\
              "property": "OperationalStatus",\
              "db": "ACROSS",\
              "table": "EASY_H_CONTRIBUTION_GROUP",\
              "column": "OPERATIONAL_STATUS"\
            },\
            {\
              "property": "OperationalStatus",\
              "db": "ACROSS",\
              "table": "EASY_H_CONTRIB_GROUP_INTER",\
              "column": "OPERATIONAL_STATUS"\
            },\
            {\
              "property": "CovidCode",\
              "db": "ACROSS",\
              "table": "RECO_CONTRIBUTION_PROPERTIES",\
              "column": "COVID_POSTPONEMENT_TYPE"\
            },\
            {\
              "property": "CovidCode",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JCOVIDCOD"\
            },\
            {\
              "property": "ExpectedDeclarationCount",\
              "db": "ACROSS",\
              "table": "RECO_CONTRIBUTION_PROPERTIES",\
              "column": "EXPECTED_DECLARATION_COUNT"\
            },\
            {\
              "property": "ExpectedDeclarationCount",\
              "db": "ACROSS",\
              "table": "RECO_CONTRIB_PROPERTIES_INTER",\
              "column": "EXPECTED_DECLARATION_COUNT"\
            },\
            {\
              "property": "ExpectedDeclarationCount",\
              "db": "ATCE",\
              "table": "JT",\
              "column": "JTNOMDCL"\
            },\
            {\
              "property": "CovidLastIdentificationTms",\
              "db": "ACROSS",\
              "table": "RECO_CONTRIBUTION_PROPERTIES",\
              "column": "COVID_LAST_IDENTIFICATION_TMS",\
              "converter": "DD/MM/YYYY HH:mm:ss_TO_DATE"\
            },\
            {\
              "property": "InterestsReduction",\
              "db": "ACROSS",\
              "table": "RECO_CONTRIB_PROPERTIES_INTER",\
              "column": "INTERESTS_REDUCTION"\
            },\
            {\
              "property": "PaymentDueDateCode",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JDELAICPAY"\
            },\
            {\
              "property": "PaymentDueDate",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JDELAIDPAY",\
              "converter": "DD/MM/YYYY_TO_CYYMMDD"\
            },\
            {\
              "property": "DueDate",\
              "db": "ACROSS",\
              "table": "RECO_CONTRIBUTION_PROPERTIES",\
              "column": "DUE_DATE",\
              "converter": "DD/MM/YYYY HH:mm:ss_TO_DATE"\
            },\
            {\
              "property": "ExpectedDeclarationDefinitive",\
              "db": "ACROSS",\
              "table": "RECO_CONTRIBUTION_PROPERTIES",\
              "column": "IS_DEFINITIVE"\
            },\
            {\
              "property": "GroupStatus",\
              "db": "ACROSS",\
              "table": "EASY_H_CONTRIBUTION_GROUP",\
              "column": "ENTRY_GROUP_STATUS"\
            },\
            {\
              "property": "GroupStatus",\
              "db": "ACROSS",\
              "table": "EASY_H_CONTRIB_GROUP_INTER",\
              "column": "ENTRY_GROUP_STATUS"\
            },\
            {\
              "property": "DueDate",\
              "db": "ACROSS",\
              "table": "RECO_CONTRIB_PROPERTIES_INTER",\
              "column": "DUE_DATE",\
              "converter": "DD/MM/YYYY HH:mm:ss_TO_DATE"\
            },\
            {\
              "property": "CovidCode",\
              "db": "ACROSS",\
              "table": "RECO_CONTRIB_PROPERTIES_INTER",\
              "column": "COVID_POSTPONEMENT_TYPE"\
            },\
            {\
              "property": "ExpectedDeclarationDefinitive",\
              "db": "ACROSS",\
              "table": "RECO_CONTRIB_PROPERTIES_INTER",\
              "column": "IS_DEFINITIVE"\
            },\
            {\
              "property": "ExpectedUnmonitoredDclCount",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JDCLNONSURV"\
            },\
            {\
              "property": "ExpectedUnmonitoredDclCount",\
              "db": "ATCE",\
              "table": "JT",\
              "column": "JTDCLNONSURV"\
            },\
            {\
              "property": "PPETat",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JPPETAT"\
            },\
            {\
              "property": "BlockingCode",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JCODBLOK"\
            },\
            {\
              "property": "PPSPEtat",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JPPSPETAT"\
            },\
            {\
              "property": "CreatedDate",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JDATSTART",\
              "converter": "DD/MM/YYYY HH:mm:ss_TO_DATE"\
            },\
            {\
              "property": "IncreasesBalance",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JSOLMAJ"\
            },\
            {\
              "property": "InterestsBalance",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JSOLINT"\
            },\
            {\
              "property": "ContributionBalance",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JSOLCOT"\
            },\
            {\
              "property": "CreatedDate",\
              "db": "ATCE",\
              "table": "J",\
              "column": "JDATEFFET",\
              "converter": "DD/MM/YYYY HH:mm:ss_TO_DATE"\
            }\
          ],\
          "technicalMappings": [\
            {\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY_GROUP",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_CONTRIBUTION_GROUP",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_CONTRIBUTION_GROUP",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_CONTRIB_GROUP_INTER",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "LEGACY_CONTRIBUTION_GRP_LINK",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "RECO_CONTRIBUTION_PROPERTIES",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "RECO_CONTRIB_PROPERTIES_INTER",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "JT",\
              "column": "JTCOVIDCOD",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_CONTRIBUTION_GROUP",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_CONTRIBUTION_GROUP",\
              "column": "H_CONTRIBUTION_GROUP_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ACROSS",\
              "table": "RECO_CONTRIBUTION_PROPERTIES",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "RECO_CONTRIB_PROPERTIES_INTER",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "LEGACY_CONTRIBUTION_GRP_LINK",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_CONTRIB_GROUP_INTER",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY_GROUP",\
              "column": "ENTRY_GROUP_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ACROSS",\
              "table": "LEGACY_CONTRIBUTION_GRP_LINK",\
              "column": "ENTRY_OK",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_CONTRIBUTION_GROUP",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_CONTRIB_GROUP_INTER",\
              "column": "H_CONTRIBUTION_GROUP_INT_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_POT_GROUP",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_POT_GROUP",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_POT_GROUP",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_POT_GROUP",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "LEGACY_POT_GRP_LINK",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "LEGACY_POT_GRP_LINK",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_POT_GROUP",\
              "column": "H_POT_GROUP_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ACROSS",\
              "table": "LEGACY_POT_GRP_LINK",\
              "column": "ENTRY_OK",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_POT_GROUP",\
              "column": "OPERATIONAL_STATUS",\
              "generator": "FIXED_VALUE"\
            },\
            {\
              "db": "ATCE",\
              "table": "JT",\
              "column": "JTDATEFFET",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "J",\
              "column": "JNROPER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0000"\
            },\
            {\
              "db": "ATCE",\
              "table": "JT",\
              "column": "JTNROPER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0000"\
            },\
            {\
              "db": "ATCE",\
              "table": "J",\
              "column": "JORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "P"\
            },\
            {\
              "db": "ATCE",\
              "table": "JT",\
              "column": "JTORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "P"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT_ENTRY_GROUP",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            }\
          ],\
          "referencedConcepts": [\
            {\
              "referencedConcept": "Account",\
              "referenceName": "Account",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_CONTRIBUTION_GROUP",\
                  "column": "ACCOUNT_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_ACCOUNT",\
                  "referencedColumn": "ACCOUNT_ID"\
                },\
                {\
                  "db": "ACROSS",\
                  "table": "LEGACY_CONTRIBUTION_GRP_LINK",\
                  "column": "JMATR",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "J",\
                  "column": "JGROUP",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AGROUP"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "J",\
                  "column": "JMATR",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "JT",\
                  "column": "JTGROUP",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AGROUP"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "JT",\
                  "column": "JTMATR",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                },\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_ACCOUNT_ENTRY_GROUP",\
                  "column": "ACCOUNT_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_ACCOUNT",\
                  "referencedColumn": "ACCOUNT_ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "BusinessEvent",\
              "referenceName": "BusinessEvent",\
              "useAncestor": false,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_H_CONTRIBUTION_GROUP",\
                  "column": "BUSS_EVENT_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "COM_BUSINESS_EVENT",\
                  "referencedColumn": "BUSS_EVENT_ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "ContributionGroup",\
              "referenceName": "ContributionGroup",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_CONTRIBUTION_GROUP",\
                  "column": "ENTRY_GROUP_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_ACCOUNT_ENTRY_GROUP",\
                  "referencedColumn": "ENTRY_GROUP_ID"\
                },\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_H_CONTRIB_GROUP_INTER",\
                  "column": "H_CONTRIBUTION_GROUP_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_H_CONTRIBUTION_GROUP",\
                  "referencedColumn": "H_CONTRIBUTION_GROUP_ID"\
                },\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_H_CONTRIBUTION_GROUP",\
                  "column": "ENTRY_GROUP_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_ACCOUNT_ENTRY_GROUP",\
                  "referencedColumn": "ENTRY_GROUP_ID"\
                },\
                {\
                  "db": "ACROSS",\
                  "table": "LEGACY_CONTRIBUTION_GRP_LINK",\
                  "column": "ENTRY_GROUP_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_ACCOUNT_ENTRY_GROUP",\
                  "referencedColumn": "ENTRY_GROUP_ID"\
                },\
                {\
                  "db": "ACROSS",\
                  "table": "RECO_CONTRIB_PROPERTIES_INTER",\
                  "column": "H_CONTRIBUTION_GROUP_INT_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_H_CONTRIB_GROUP_INTER",\
                  "referencedColumn": "H_CONTRIBUTION_GROUP_INT_ID"\
                },\
                {\
                  "db": "ACROSS",\
                  "table": "RECO_CONTRIBUTION_PROPERTIES",\
                  "column": "H_CONTRIBUTION_GROUP_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_H_CONTRIBUTION_GROUP",\
                  "referencedColumn": "H_CONTRIBUTION_GROUP_ID"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "J",\
                  "column": "JKWART",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "LEGACY_CONTRIBUTION_GRP_LINK",\
                  "referencedColumn": "JKWART"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "J",\
                  "column": "JPERIOD",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "LEGACY_CONTRIBUTION_GRP_LINK",\
                  "referencedColumn": "JPERIOD"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "JT",\
                  "column": "JTKWART",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "LEGACY_CONTRIBUTION_GRP_LINK",\
                  "referencedColumn": "JKWART"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "StandardEvent",\
              "referenceName": "StandardEvent",\
              "useAncestor": false,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_H_CONTRIB_GROUP_INTER",\
                  "column": "SUB_EVENT_ID",\
                  "referencedDb": "SPINE",\
                  "referencedTable": "EVENT",\
                  "referencedColumn": "EVENT_ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "AmicablePaymentPlan",\
              "referenceName": "AmicablePaymentPlan",\
              "useAncestor": false,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "RECO_CONTRIBUTION_PROPERTIES",\
                  "column": "PLAN_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "PAYMENT_EXTENSION",\
                  "referencedColumn": "ID"\
                },\
                {\
                  "db": "ACROSS",\
                  "table": "RECO_CONTRIB_PROPERTIES_INTER",\
                  "column": "PLAN_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "PAYMENT_EXTENSION",\
                  "referencedColumn": "ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "Ensemble",\
              "referenceName": "Ensemble",\
              "useAncestor": false,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "RECO_CONTRIBUTION_PROPERTIES",\
                  "column": "ENVELOPE_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "PAYMENT_EXTENSION",\
                  "referencedColumn": "ID"\
                },\
                {\
                  "db": "ACROSS",\
                  "table": "RECO_CONTRIB_PROPERTIES_INTER",\
                  "column": "ENVELOPE_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "PAYMENT_EXTENSION",\
                  "referencedColumn": "ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "Document",\
              "referenceName": "Document",\
              "useAncestor": false,\
              "details": [\
                {\
                  "db": "ATCE",\
                  "table": "J",\
                  "column": "JCODDOK",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "DOK",\
                  "referencedColumn": "DOKCOD"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "J",\
                  "column": "JDATDOK",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "DOK",\
                  "referencedColumn": "DOKDAT"\
                }\
              ]\
            }\
          ]\
        },\
        {\
          "name": "Term",\
          "root": false,\
          "properties": [\
            {\
              "name": "Amount",\
              "type": "NUMBER"\
            },\
            {\
              "name": "DueDate",\
              "type": "DD/MM/YYYY"\
            },\
            {\
              "name": "TermNr",\
              "type": "Number",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "name": "TermType",\
              "type": "Text",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "SURV_TERM"\
            },\
            {\
              "name": "SurvType",\
              "type": "Text",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "PP3_TERM"\
            },\
            {\
              "name": "Status",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "FUTURE"\
            }\
          ],\
          "children": [],\
          "tables": [\
            {\
              "db": "ATCE",\
              "table": "PMTEXT_TERM"\
            }\
          ],\
          "businessMappings": [\
            {\
              "property": "Amount",\
              "db": "ATCE",\
              "table": "PMTEXT_TERM",\
              "column": "AMOUNT"\
            },\
            {\
              "property": "TermNr",\
              "db": "ATCE",\
              "table": "PMTEXT_TERM",\
              "column": "TERM_NR"\
            },\
            {\
              "property": "TermType",\
              "db": "ATCE",\
              "table": "PMTEXT_TERM",\
              "column": "TERM_TYPE"\
            },\
            {\
              "property": "DueDate",\
              "db": "ATCE",\
              "table": "PMTEXT_TERM",\
              "column": "DUE_DATE",\
              "converter": "DD/MM/YYYY_TO_DATE"\
            }\
          ],\
          "technicalMappings": [\
            {\
              "db": "ATCE",\
              "table": "PMTEXT_TERM",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "PMTEXT_TERM",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "PMTEXT_TERM",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "PMTEXT_TERM",\
              "column": "CREATION_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            },\
            {\
              "db": "ATCE",\
              "table": "PMTEXT_TERM",\
              "column": "LAST_UPDATE_ORIG",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "RECOVERY"\
            }\
          ],\
          "referencedConcepts": [\
            {\
              "referencedConcept": "AmicablePaymentPlan",\
              "referenceName": "AmicablePaymentPlan",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ATCE",\
                  "table": "PMTEXT_TERM",\
                  "column": "PMTEXT_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "PAYMENT_EXTENSION",\
                  "referencedColumn": "ID"\
                }\
              ]\
            }\
          ]\
        },\
        {\
          "name": "Period",\
          "root": false,\
          "children": [],\
          "tables": [\
            {\
              "db": "ATCE",\
              "table": "PMTEXT_PERIOD"\
            }\
          ],\
          "technicalMappings": [\
            {\
              "db": "ATCE",\
              "table": "PMTEXT_PERIOD",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            }\
          ],\
          "referencedConcepts": [\
            {\
              "referencedConcept": "Account",\
              "referenceName": "Account",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ATCE",\
                  "table": "PMTEXT_PERIOD",\
                  "column": "ACCOUNT_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_ACCOUNT",\
                  "referencedColumn": "ACCOUNT_ID"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "PMTEXT_PERIOD",\
                  "column": "MATR_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "AmicablePaymentPlan",\
              "referenceName": "AmicablePaymentPlan",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ATCE",\
                  "table": "PMTEXT_PERIOD",\
                  "column": "PMTEXT_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "PAYMENT_EXTENSION",\
                  "referencedColumn": "ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "ContributionGroup",\
              "referenceName": "ContributionGroup",\
              "useAncestor": false,\
              "details": [\
                {\
                  "db": "ATCE",\
                  "table": "PMTEXT_PERIOD",\
                  "column": "ENTRY_GROUP_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_CONTRIBUTION_GROUP",\
                  "referencedColumn": "ENTRY_GROUP_ID"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "PMTEXT_PERIOD",\
                  "column": "PERIOD",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "LEGACY_CONTRIBUTION_GRP_LINK",\
                  "referencedColumn": "JPERIOD"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "PMTEXT_PERIOD",\
                  "column": "QUARTER_ID",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "J",\
                  "referencedColumn": "JKWART",\
                  "converter": "CYYQ_TO_YYYYQ"\
                }\
              ]\
            }\
          ]\
        },\
        {\
          "name": "Party",\
          "root": true,\
          "properties": [\
            {\
              "name": "CompanyId",\
              "type": "NUMBER"\
            },\
            {\
              "name": "Type",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "EMPLOYER"\
            }\
          ],\
          "children": [\
            "Account",\
            "BusinessEvent"\
          ],\
          "tables": [\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY"\
            },\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY"\
            },\
            {\
              "db": "PAYIT",\
              "table": "PARTY"\
            }\
          ],\
          "businessMappings": [\
            {\
              "property": "CompanyId",\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY",\
              "column": "REFERENCE"\
            },\
            {\
              "property": "Type",\
              "db": "PARTY",\
              "table": "NPTY_PARTY",\
              "column": "PARTY_TYPE"\
            },\
            {\
              "property": "CompanyId",\
              "db": "PAYIT",\
              "table": "PARTY",\
              "column": "COMPANY_ID"\
            }\
          ],\
          "technicalMappings": [\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY",\
              "column": "PARTY_ID",\
              "generator": "SEQUENCE",\
              "generatorProperty": "PARTY_SEQ"\
            },\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "ADVANCE",\
              "column": "ADVANCE_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "PAYIT",\
              "table": "PARTY",\
              "column": "ID",\
              "generator": "SEQUENCE",\
              "generatorProperty": "PRID_SEQUENCE"\
            },\
            {\
              "db": "PAYIT",\
              "table": "PARTY",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY",\
              "column": "PTYIDT_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY",\
              "column": "IDENTITY_TYPE",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "COMPANY_ID"\
            }\
          ],\
          "referencedConcepts": [\
            {\
              "referencedConcept": "Party",\
              "referenceName": "Party",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "PARTY",\
                  "table": "NPTY_PARTY_IDENTITY",\
                  "column": "PARTY_ID",\
                  "referencedDb": "PARTY",\
                  "referencedTable": "NPTY_PARTY",\
                  "referencedColumn": "PARTY_ID"\
                },\
                {\
                  "db": "PAYIT",\
                  "table": "PARTY",\
                  "column": "CDS_PARTY_ID",\
                  "referencedDb": "PARTY",\
                  "referencedTable": "NPTY_PARTY",\
                  "referencedColumn": "PARTY_ID"\
                }\
              ]\
            }\
          ]\
        },\
        {\
          "name": "Account",\
          "root": false,\
          "properties": [\
            {\
              "name": "AdministrativeSituation",\
              "type": "TEXT"\
            },\
            {\
              "name": "Nsso",\
              "type": "TEXT"\
            },\
            {\
              "name": "PreviousSsaNbr",\
              "type": "TEXT"\
            },\
            {\
              "name": "CovidTicket",\
              "type": "TEXT"\
            },\
            {\
              "name": "CovidFrom",\
              "type": "DD/MM/YYYY"\
            },\
            {\
              "name": "AdfanExecutionState",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "name": "SsaNbr",\
              "type": "TEXT"\
            },\
            {\
              "name": "CovidCode",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "name": "CovidOrigin",\
              "type": "NUMBER"\
            },\
            {\
              "name": "CovidTo",\
              "type": "DD/MM/YYYY"\
            },\
            {\
              "name": "Group",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "01"\
            },\
            {\
              "name": "SuppressionDate",\
              "type": "DD/MM/YYYY"\
            },\
            {\
              "name": "LraId",\
              "type": "NUMBER"\
            },\
            {\
              "name": "CovidEndCode",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "name": "AccountType",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "EMPL"\
            },\
            {\
              "name": "AccountSubType",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "STANDARD"\
            },\
            {\
              "name": "OrionSimulation",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            }\
          ],\
          "children": [\
            "Advance",\
            "Category",\
            "ClaimStep",\
            "ContributionGroup",\
            "Document",\
            "Ensemble",\
            "JudicialGroup",\
            "PotGroup",\
            "WaitingGroup"\
          ],\
          "tables": [\
            {\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_ACCOUNT"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_PARTY_IDENTITY"\
            },\
            {\
              "db": "ATCE",\
              "table": "A"\
            },\
            {\
              "db": "ATCE",\
              "table": "I"\
            },\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY"\
            }\
          ],\
          "businessMappings": [\
            {\
              "property": "Group",\
              "db": "ATCE",\
              "table": "A",\
              "column": "AGROUP"\
            },\
            {\
              "property": "Nsso",\
              "db": "ATCE",\
              "table": "A",\
              "column": "ANC",\
              "converter": "NSSO_TO_CHECK_DIGITS"\
            },\
            {\
              "property": "Nsso",\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY",\
              "column": "REFERENCE"\
            },\
            {\
              "property": "SuppressionDate",\
              "db": "ATCE",\
              "table": "A",\
              "column": "ADATSUP",\
              "converter": "DD/MM/YYYY_TO_CYYMMDD"\
            },\
            {\
              "property": "AdfanExecutionState",\
              "db": "ATCE",\
              "table": "I",\
              "column": "IADFCTOE"\
            },\
            {\
              "property": "CovidFrom",\
              "db": "ATCE",\
              "table": "I",\
              "column": "ICOVIDDATEFROM",\
              "converter": "DD/MM/YYYY_TO_DATE"\
            },\
            {\
              "property": "CovidTo",\
              "db": "ATCE",\
              "table": "I",\
              "column": "ICOVIDDATETO",\
              "converter": "DD/MM/YYYY_TO_DATE"\
            },\
            {\
              "property": "Nsso",\
              "db": "ATCE",\
              "table": "A",\
              "column": "ARA",\
              "converter": "NSSO_TO_ARA"\
            },\
            {\
              "property": "PreviousSsaNbr",\
              "db": "ATCE",\
              "table": "A",\
              "column": "ANRSSPREC"\
            },\
            {\
              "property": "AdministrativeSituation",\
              "db": "ATCE",\
              "table": "A",\
              "column": "ACODSJD"\
            },\
            {\
              "property": "CovidTicket",\
              "db": "ATCE",\
              "table": "I",\
              "column": "ICOVIDTICKET"\
            },\
            {\
              "property": "CovidCode",\
              "db": "ATCE",\
              "table": "I",\
              "column": "ICOVIDCOD"\
            },\
            {\
              "property": "Nsso",\
              "db": "ATCE",\
              "table": "A",\
              "column": "AMATR",\
              "converter": "NSSO_TO_INVERTED"\
            },\
            {\
              "property": "Nsso",\
              "db": "ATCE",\
              "table": "A",\
              "column": "AREM",\
              "converter": "NSSO_TO_AREM"\
            },\
            {\
              "property": "SsaNbr",\
              "db": "ATCE",\
              "table": "A",\
              "column": "ANRSS"\
            },\
            {\
              "property": "CovidOrigin",\
              "db": "ATCE",\
              "table": "I",\
              "column": "ICOVIDORIG"\
            },\
            {\
              "property": "LraId",\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY",\
              "column": "LRA_ID"\
            },\
            {\
              "property": "CovidEndCode",\
              "db": "ATCE",\
              "table": "I",\
              "column": "ICOVIDENDCOD"\
            },\
            {\
              "property": "OrionSimulation",\
              "db": "ATCE",\
              "table": "I",\
              "column": "IORIONSIMULATION"\
            },\
            {\
              "property": "AccountType",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT",\
              "column": "ACCOUNT_TYPE"\
            },\
            {\
              "property": "AccountSubType",\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT",\
              "column": "ACCOUNT_SUB_TYPE"\
            },\
            {\
              "property": "Nsso",\
              "db": "ACROSS",\
              "table": "EASY_PARTY_IDENTITY",\
              "column": "NOSS_REG_NBR"\
            }\
          ],\
          "technicalMappings": [\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_ACCOUNT",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY",\
              "column": "IDENTITY_TYPE",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "NSSO"\
            },\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY",\
              "column": "PTYIDT_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ATCE",\
              "table": "A",\
              "column": "ACOMEMP",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "TEST"\
            },\
            {\
              "db": "ATCE",\
              "table": "A",\
              "column": "ACODLOC",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "62096"\
            },\
            {\
              "db": "ATCE",\
              "table": "A",\
              "column": "ACODIMP",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "210"\
            },\
            {\
              "db": "ATCE",\
              "table": "A",\
              "column": "ACCAT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "A",\
              "column": "APOSTEMP",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "4101"\
            },\
            {\
              "db": "ATCE",\
              "table": "I",\
              "column": "ISITREPRISEFJ",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "9"\
            },\
            {\
              "db": "ATCE",\
              "table": "A",\
              "column": "ADATMISAJ",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "115212"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_PARTY_IDENTITY",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "I",\
              "column": "INOMZAL",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "A",\
              "column": "ADENOMEMP",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "TEST denom"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_PARTY_IDENTITY",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "PARTY",\
              "table": "NPTY_PARTY_IDENTITY",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_ACCOUNT",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "I",\
              "column": "INUMPROC",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "61"\
            },\
            {\
              "db": "ATCE",\
              "table": "A",\
              "column": "ADATAFFIL",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1200101"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_H_ACCOUNT",\
              "column": "H_ACCOUNT_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT",\
              "column": "ACCOUNT_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "ACROSS",\
              "table": "EASY_ACCOUNT",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ATCE",\
              "table": "B",\
              "column": "BDATRADCAT",\
              "generator": "FIXED_VALUE"\
            },\
            {\
              "db": "ATCE",\
              "table": "B",\
              "column": "BINDEXCAT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "317"\
            },\
            {\
              "db": "ATCE",\
              "table": "B",\
              "column": "BTRIMDCL",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1204"\
            },\
            {\
              "db": "ATCE",\
              "table": "B",\
              "column": "BCODLOC",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "53020"\
            },\
            {\
              "db": "ATCE",\
              "table": "B",\
              "column": "BCOD2PILEMPLOYE",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "9"\
            },\
            {\
              "db": "ATCE",\
              "table": "B",\
              "column": "BCOD2PILOUVRIER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "9"\
            },\
            {\
              "db": "ATCE",\
              "table": "B",\
              "column": "BCODNACE",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "db": "ATCE",\
              "table": "B",\
              "column": "BCODNACENEW",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "56102"\
            },\
            {\
              "db": "ATCE",\
              "table": "I",\
              "column": "ICOVIDCODTRAVEL",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "db": "ATCE",\
              "table": "I",\
              "column": "ICOVIDCOD2",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            }\
          ],\
          "referencedConcepts": [\
            {\
              "referencedConcept": "Account",\
              "referenceName": "Account",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_H_ACCOUNT",\
                  "column": "ACCOUNT_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_ACCOUNT",\
                  "referencedColumn": "ACCOUNT_ID"\
                },\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_PARTY_IDENTITY",\
                  "column": "ACCOUNT_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_ACCOUNT",\
                  "referencedColumn": "ACCOUNT_ID"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "I",\
                  "column": "IGROUP",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AGROUP"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "I",\
                  "column": "IMATR",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                },\
                {\
                  "db": "ATCE",\
                  "table": "B",\
                  "column": "BMATR",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "BusinessEvent",\
              "referenceName": "BusinessEvent",\
              "useAncestor": false,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_H_ACCOUNT",\
                  "column": "BUSS_EVENT_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "COM_BUSINESS_EVENT",\
                  "referencedColumn": "BUSS_EVENT_ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "Party",\
              "referenceName": "Party",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_ACCOUNT",\
                  "column": "PARTY_ID",\
                  "referencedDb": "PARTY",\
                  "referencedTable": "NPTY_PARTY",\
                  "referencedColumn": "PARTY_ID"\
                },\
                {\
                  "db": "PARTY",\
                  "table": "NPTY_PARTY_IDENTITY",\
                  "column": "PARTY_ID",\
                  "referencedDb": "PARTY",\
                  "referencedTable": "NPTY_PARTY",\
                  "referencedColumn": "PARTY_ID"\
                },\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_H_ACCOUNT",\
                  "column": "PARTY_ID",\
                  "referencedDb": "PARTY",\
                  "referencedTable": "NPTY_PARTY",\
                  "referencedColumn": "PARTY_ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "StandardEvent",\
              "referenceName": "StandardEvent",\
              "useAncestor": false,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "EASY_H_ACCOUNT",\
                  "column": "SUB_EVENT_ID",\
                  "referencedDb": "SPINE",\
                  "referencedTable": "EVENT",\
                  "referencedColumn": "EVENT_ID"\
                }\
              ]\
            }\
          ]\
        },\
        {\
          "name": "BusinessEvent",\
          "root": false,\
          "properties": [\
            {\
              "name": "EventType",\
              "type": "Varchar",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "BROL"\
            },\
            {\
              "name": "Time",\
              "type": "DD/MM/YYYY HH:MI:SS",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "01/01/2022 09:00:00"\
            },\
            {\
              "name": "Application",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "APPLICATION"\
            }\
          ],\
          "children": [\
            "StandardEvent"\
          ],\
          "tables": [\
            {\
              "db": "ACROSS",\
              "table": "COM_BUSINESS_EVENT"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT"\
            }\
          ],\
          "businessMappings": [\
            {\
              "property": "EventType",\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "EVENT_TYPE"\
            },\
            {\
              "property": "Time",\
              "db": "ACROSS",\
              "table": "COM_BUSINESS_EVENT",\
              "column": "EVENT_TIME",\
              "converter": "DD/MM/YYYY HH:mm:ss_TO_DATE"\
            },\
            {\
              "property": "Time",\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "EVENT_TIME",\
              "converter": "DD/MM/YYYY HH:mm:ss_TO_DATE"\
            },\
            {\
              "property": "Application",\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "APPLICATION"\
            }\
          ],\
          "technicalMappings": [\
            {\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "EVENT_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "VERSION",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "COM_BUSINESS_EVENT",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "COM_BUSINESS_EVENT",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "LAST_UPDATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "ACROSS",\
              "table": "COM_BUSINESS_EVENT",\
              "column": "BUSS_EVENT_ID",\
              "generator": "SEQUENCE"\
            },\
            {\
              "db": "SPINE",\
              "table": "EVENT",\
              "column": "INSTIGATOR",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "SYSTEM"\
            }\
          ],\
          "referencedConcepts": [\
            {\
              "referencedConcept": "BusinessEvent",\
              "referenceName": "BusinessEvent",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ACROSS",\
                  "table": "COM_BUSINESS_EVENT",\
                  "column": "EXTERNAL_EVENT_ID",\
                  "referencedDb": "SPINE",\
                  "referencedTable": "EVENT",\
                  "referencedColumn": "EVENT_ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "Party",\
              "referenceName": "Party",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "SPINE",\
                  "table": "EVENT",\
                  "column": "PARTY_ID",\
                  "referencedDb": "PARTY",\
                  "referencedTable": "NPTY_PARTY",\
                  "referencedColumn": "PARTY_ID"\
                }\
              ]\
            }\
          ]\
        },\
        {\
          "name": "FinancialNote",\
          "root": false,\
          "properties": [\
            {\
              "name": "DueDate",\
              "type": "DD/MM/YYYY",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "01/01/2023"\
            },\
            {\
              "name": "Type",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "C397"\
            },\
            {\
              "name": "Initiator",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "ADFAN"\
            },\
            {\
              "name": "Domain",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "REMINDER"\
            },\
            {\
              "name": "InitialAmount",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "name": "NetOwnedAmount",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            }\
          ],\
          "children": [\
            "AccountLine",\
            "JudicialAccountLine"\
          ],\
          "tables": [\
            {\
              "db": "PAYIT",\
              "table": "FINANCIAL_NOTE"\
            },\
            {\
              "db": "PAYIT",\
              "table": "FIN_NOTE_DOC"\
            }\
          ],\
          "businessMappings": [\
            {\
              "property": "DueDate",\
              "db": "PAYIT",\
              "table": "FINANCIAL_NOTE",\
              "column": "DUE_DATE",\
              "converter": "DD/MM/YYYY_TO_DATE"\
            },\
            {\
              "property": "Type",\
              "db": "PAYIT",\
              "table": "FINANCIAL_NOTE",\
              "column": "FIN_NOTE_TYPE"\
            },\
            {\
              "property": "Initiator",\
              "db": "PAYIT",\
              "table": "FINANCIAL_NOTE",\
              "column": "FIN_NOTE_INITIATOR"\
            },\
            {\
              "property": "Domain",\
              "db": "PAYIT",\
              "table": "FINANCIAL_NOTE",\
              "column": "TRANSACTION_DOMAIN"\
            },\
            {\
              "property": "InitialAmount",\
              "db": "PAYIT",\
              "table": "FINANCIAL_NOTE",\
              "column": "INITIAL_AMOUNT"\
            },\
            {\
              "property": "NetOwnedAmount",\
              "db": "PAYIT",\
              "table": "FINANCIAL_NOTE",\
              "column": "NET_OWED_AMOUNT"\
            }\
          ],\
          "technicalMappings": [\
            {\
              "db": "PAYIT",\
              "table": "FINANCIAL_NOTE",\
              "column": "CREATED_BY",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "TED"\
            },\
            {\
              "db": "PAYIT",\
              "table": "FINANCIAL_NOTE",\
              "column": "ID",\
              "generator": "SEQUENCE",\
              "generatorProperty": "FNNT_SEQUENCE"\
            },\
            {\
              "db": "PAYIT",\
              "table": "FINANCIAL_NOTE",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "PAYIT",\
              "table": "FINANCIAL_NOTE",\
              "column": "ISSUE_DATE",\
              "generator": "TIMESTAMP"\
            }\
          ],\
          "referencedConcepts": [\
            {\
              "referencedConcept": "Document",\
              "referenceName": "Document",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "PAYIT",\
                  "table": "FINANCIAL_NOTE",\
                  "column": "REFERENCE_NBR",\
                  "referencedProperty": "ProducerRef"\
                },\
                {\
                  "db": "PAYIT",\
                  "table": "FINANCIAL_NOTE",\
                  "column": "RECIPIENT_ID",\
                  "referencedDb": "PAYIT",\
                  "referencedTable": "DOCUMENT",\
                  "referencedColumn": "PARTY_ID"\
                },\
                {\
                  "db": "PAYIT",\
                  "table": "FINANCIAL_NOTE",\
                  "column": "ISSUER_ID",\
                  "referencedDb": "PAYIT",\
                  "referencedTable": "DOCUMENT",\
                  "referencedColumn": "PARTY_ID"\
                },\
                {\
                  "db": "PAYIT",\
                  "table": "FIN_NOTE_DOC",\
                  "column": "DOCUMENT_ID",\
                  "referencedDb": "PAYIT",\
                  "referencedTable": "DOCUMENT",\
                  "referencedColumn": "ID"\
                },\
                {\
                  "db": "PAYIT",\
                  "table": "FINANCIAL_NOTE",\
                  "column": "REFERENCE_NBR_INDEXATION",\
                  "referencedProperty": "ProducerRef"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "FinancialNote",\
              "referenceName": "FinancialNote",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "PAYIT",\
                  "table": "FIN_NOTE_DOC",\
                  "column": "FIN_NOTE_ID",\
                  "referencedDb": "PAYIT",\
                  "referencedTable": "FINANCIAL_NOTE",\
                  "referencedColumn": "ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "Account",\
              "referenceName": "Account",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "PAYIT",\
                  "table": "FINANCIAL_NOTE",\
                  "column": "ACCOUNT_ID",\
                  "referencedDb": "ACROSS",\
                  "referencedTable": "EASY_ACCOUNT",\
                  "referencedColumn": "ACCOUNT_ID"\
                }\
              ]\
            }\
          ]\
        },\
        {\
          "name": "Document",\
          "root": false,\
          "properties": [\
            {\
              "name": "StructuredCommunication",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "100000054897"\
            },\
            {\
              "name": "DocumentDate",\
              "type": "DD/MM/YYYY HH:MI:SS",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "01/01/2023 15:05:10"\
            },\
            {\
              "name": "DocumentCode",\
              "type": "TEXT"\
            },\
            {\
              "name": "ClosureDate",\
              "type": "DD/MM/YYYY",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "01/01/2023"\
            },\
            {\
              "name": "ProcedureNumber",\
              "type": "NUMBER"\
            },\
            {\
              "name": "AgentNbr",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0000"\
            },\
            {\
              "name": "DocType",\
              "type": "TEXT"\
            },\
            {\
              "name": "ProducerRef",\
              "type": "TEXT",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "ref"\
            },\
            {\
              "name": "Amount",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "0"\
            },\
            {\
              "name": "ContributionTotal",\
              "type": "NUMBER"\
            },\
            {\
              "name": "IncreaseTotal",\
              "type": "NUMBER"\
            },\
            {\
              "name": "InterestTotal",\
              "type": "NUMBER"\
            },\
            {\
              "name": "LegalCostTotal",\
              "type": "NUMBER"\
            },\
            {\
              "name": "397BisTrimester",\
              "type": "NUMBER"\
            },\
            {\
              "name": "LastEntryDate",\
              "type": "DD/MM/YYYY",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "01/01/2024"\
            },\
            {\
              "name": "SequenceNbr",\
              "type": "NUMBER",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "999"\
            }\
          ],\
          "children": [\
            "DocumentLine",\
            "FinNote",\
            "FinancialNote"\
          ],\
          "tables": [\
            {\
              "db": "ATCE",\
              "table": "DOK"\
            },\
            {\
              "db": "PAYIT",\
              "table": "DOCUMENT"\
            },\
            {\
              "db": "PAYIT",\
              "table": "PAYMENT_ORDER"\
            }\
          ],\
          "businessMappings": [\
            {\
              "property": "StructuredCommunication",\
              "db": "PAYIT",\
              "table": "PAYMENT_ORDER",\
              "column": "END_TO_END_ID"\
            },\
            {\
              "property": "DocumentDate",\
              "db": "ATCE",\
              "table": "DOK",\
              "column": "DOKDAT",\
              "converter": "DD/MM/YYYY HH:mm:ss_TO_DATE"\
            },\
            {\
              "property": "DocumentCode",\
              "db": "ATCE",\
              "table": "DOK",\
              "column": "DOKCOD"\
            },\
            {\
              "property": "ClosureDate",\
              "db": "ATCE",\
              "table": "DOK",\
              "column": "DOKDATCLOT",\
              "converter": "DD/MM/YYYY_TO_CYYMMDD"\
            },\
            {\
              "property": "ProcedureNumber",\
              "db": "ATCE",\
              "table": "DOK",\
              "column": "DOKNUMPROC"\
            },\
            {\
              "property": "AgentNbr",\
              "db": "ATCE",\
              "table": "DOK",\
              "column": "DOKNROPER"\
            },\
            {\
              "property": "Amount",\
              "db": "PAYIT",\
              "table": "PAYMENT_ORDER",\
              "column": "AMOUNT"\
            },\
            {\
              "property": "DocType",\
              "db": "PAYIT",\
              "table": "DOCUMENT",\
              "column": "DOC_TYPE"\
            },\
            {\
              "property": "ProducerRef",\
              "db": "PAYIT",\
              "table": "DOCUMENT",\
              "column": "PRODUCER_REF"\
            }\
          ],\
          "technicalMappings": [\
            {\
              "db": "ATCE",\
              "table": "DOK",\
              "column": "DOKCODCREA",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1"\
            },\
            {\
              "db": "ATCE",\
              "table": "DOK",\
              "column": "DOKDATCLOTC398",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "1210101"\
            },\
            {\
              "db": "PAYIT",\
              "table": "DOCUMENT",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            },\
            {\
              "db": "PAYIT",\
              "table": "DOCUMENT",\
              "column": "ID",\
              "generator": "SEQUENCE",\
              "generatorProperty": "DCMT_SEQUENCE"\
            },\
            {\
              "db": "PAYIT",\
              "table": "DOCUMENT",\
              "column": "CREATED_BY",\
              "generator": "FIXED_VALUE",\
              "generatorProperty": "TED"\
            },\
            {\
              "db": "PAYIT",\
              "table": "PAYMENT_ORDER",\
              "column": "ID",\
              "generator": "SEQUENCE",\
              "generatorProperty": "PYOR_SEQUENCE"\
            },\
            {\
              "db": "PAYIT",\
              "table": "PAYMENT_ORDER",\
              "column": "CREATED_ON",\
              "generator": "TIMESTAMP"\
            }\
          ],\
          "referencedConcepts": [\
            {\
              "referencedConcept": "Account",\
              "referenceName": "Account",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "ATCE",\
                  "table": "DOK",\
                  "column": "DOKMATR",\
                  "referencedDb": "ATCE",\
                  "referencedTable": "A",\
                  "referencedColumn": "AMATR"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "Party",\
              "referenceName": "Party",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "PAYIT",\
                  "table": "DOCUMENT",\
                  "column": "PARTY_ID",\
                  "referencedDb": "PAYIT",\
                  "referencedTable": "PARTY",\
                  "referencedColumn": "ID"\
                }\
              ]\
            },\
            {\
              "referencedConcept": "Document",\
              "referenceName": "Document",\
              "useAncestor": true,\
              "details": [\
                {\
                  "db": "PAYIT",\
                  "table": "DOCUMENT",\
                  "column": "PAYMENT_ORDER_ID",\
                  "referencedDb": "PAYIT",\
                  "referencedTable": "PAYMENT_ORDER",\
                  "referencedColumn": "ID"\
                }\
              ]\
            }\
          ]\
        }\
      ]\
    }\
  }\
}';
//# sourceMappingURL=defaultValueLoader.js.map