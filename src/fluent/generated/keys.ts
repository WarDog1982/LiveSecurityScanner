import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    advisory_read: {
                        table: 'sys_security_acl'
                        id: '563220b766e04b42b130f094af2a2ffb'
                    }
                    advisory_write: {
                        table: 'sys_security_acl'
                        id: '36c2429916bd4d32a248bee717302696'
                    }
                    bom_json: {
                        table: 'sys_module'
                        id: '320b0db7ab2e403ab96c414121ed4884'
                    }
                    EnrichmentService: {
                        table: 'sys_script_include'
                        id: '18cca9ac610245ceadd68b11f3c6ec64'
                    }
                    finding_create: {
                        table: 'sys_security_acl'
                        id: 'b4f636e824ab4bb3aff78a9ee8cfd72f'
                    }
                    finding_delete: {
                        table: 'sys_security_acl'
                        id: '52c46bfc65d44e4489ad65834ec4ad9d'
                    }
                    finding_flow_trigger: {
                        table: 'sys_script'
                        id: '762426d7472b4601936fd913dce7253f'
                    }
                    finding_read: {
                        table: 'sys_security_acl'
                        id: '398aa1d0f6244d638296376e5cd87ab1'
                    }
                    finding_write: {
                        table: 'sys_security_acl'
                        id: '7f5dda56d3cb444e9725bc58db274e45'
                    }
                    inventory_api: {
                        table: 'sys_ws_definition'
                        id: 'dd31d92caa43468cbc47a22d0b0d5b64'
                    }
                    inventory_route: {
                        table: 'sys_ws_operation'
                        id: 'a5a975fc6cc8465e927865a2718804dc'
                    }
                    InventoryService: {
                        table: 'sys_script_include'
                        id: 'f5f58353f7514ae8933cbd5516dff7d6'
                    }
                    livesecurity_dashboard: {
                        table: 'sys_ui_page'
                        id: '29be6b6610704e78991466c655c99aae'
                    }
                    MatcherService: {
                        table: 'sys_script_include'
                        id: 'fd4d084d7daf4546815a30cc31361289'
                    }
                    nightly_security_scan: {
                        table: 'sysscript_schedule'
                        id: '82b7759e0556454885a620df7eb256a0'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '22ec5987a0c84924ac7df5e02918d8e0'
                    }
                    sample_advisory_1: {
                        table: 'x_138679_livesecur_advisory'
                        id: 'd9ce141ab9fa43bf905520a1ad028fa9'
                    }
                    sample_advisory_2: {
                        table: 'x_138679_livesecur_advisory'
                        id: 'e9a8415282fc46c7929d310fceaa2cc4'
                    }
                    sample_scan_job: {
                        table: 'x_138679_livesecur_scan_job'
                        id: '623b31683a5f489ea3fde3b184a47df7'
                    }
                    scan_job_create: {
                        table: 'sys_security_acl'
                        id: '047a9e3ae4f44ce6ba0f98b349a44055'
                    }
                    scan_job_read: {
                        table: 'sys_security_acl'
                        id: 'e47b4e49fef64cf3ab8a4ccf00f667ca'
                    }
                    scan_job_write: {
                        table: 'sys_security_acl'
                        id: '2e2a9fdba0b34464be1513d29680063a'
                    }
                    'src_server_business-rules_finding-flow-trigger_js': {
                        table: 'sys_module'
                        id: '53078b34145a4763a9a8ea3adccd9274'
                    }
                    'src_server_scheduled-jobs_nightly-scan_js': {
                        table: 'sys_module'
                        id: 'bb369cde5b7f41888504848ca35a6c6a'
                    }
                    'src_server_script-includes_enrichment-service_js': {
                        table: 'sys_module'
                        id: '4392cf35d1f94aa2b92daa1d959ab602'
                    }
                    'src_server_script-includes_inventory-service_js': {
                        table: 'sys_module'
                        id: 'cbb3366462494bef92b3ac8e3e02fc96'
                    }
                    'src_server_script-includes_matcher-service_js': {
                        table: 'sys_module'
                        id: '8911f674d4414db697dea466f28714bd'
                    }
                    'src_server_scripted-rest_inventory-handler_js': {
                        table: 'sys_module'
                        id: '2f02752ae3794e52b7beb8644dbd5880'
                    }
                    'x_138679_livesecur/main': {
                        table: 'sys_ux_lib_asset'
                        id: 'a96a2370442d4fa3b1008cf237b72be3'
                    }
                    'x_138679_livesecur/main.js.map': {
                        table: 'sys_ux_lib_asset'
                        id: 'fe30e61b4a0141038e482823ed0d0c41'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '0057c471e828403fa66f41d6a008fafb'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0350167371c246a1b0bbcd79c6dd633e'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'summary'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '076bc52dc6624a78b95f372161bd01f4'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'severity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0fd62cc2e9f742db997e431a8640313e'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'instance_artifact'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '1354c1065e004c45a174bf45b3ba8ab3'
                        key: {
                            name: 'x_138679_livesecur_sec_task'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '14f8d43a49ac47539bca3cfe2d1ef194'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'status'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '152568f23c69459c9d5fb39d4cf5ba6c'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'published_date'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1626507df6fb434f839af7b3ec075710'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'source'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '175ab57dbf374a988135e5617d5209e6'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'instance_artifact'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '1abb497e9905490290ed77f84b224be0'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'status'
                            value: 'dismissed'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c1cab7e339b4903a8145f0082023871'
                        key: {
                            name: 'x_138679_livesecur_sec_task'
                            element: 'finding_ref'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '1ee423ac2f8a4476b4c8f4b9cece45ce'
                        key: {
                            sys_security_acl: '398aa1d0f6244d638296376e5cd87ab1'
                            sys_user_role: {
                                id: 'f5fd15789912420f9a48c21c93b2230f'
                                key: {
                                    name: 'x_138679_livesecur.reader'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '24e2afc0c2314efeb95771f0095e6f15'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'error_message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2551c68843db47efada8d0ae686ce652'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'match_confidence'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2629459c108f47dda63c5f50191ea1f7'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'cve_ids'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2778e01f6c9546a1a6aa5d22af7753d5'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'product_list'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2ae232dd72aa471a809364b759ec0d62'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'advisory_ref'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2b9bd41be7c64fbcba93caf158bb4645'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'advisory_ref'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2cb12f5587574b4c8cfe7adc0b5d9b5d'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'cve_ids'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2f7967eb6a114e5dbfe4db4b93a5cec9'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'summary'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '32becb0a05824ef5b1e1ff651196496a'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'status'
                            value: 'failed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '350db6b16fde4ba9bd50dcb176b6767c'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '35231dc132a34085a93a8ec3c5cc8484'
                        key: {
                            logical_table_name: 'x_138679_livesecur_scan_job'
                            col_name_string: 'job_status'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '353086e96eb745c7b27afc66dce07e17'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'source'
                            value: 'nvd'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '357ec62bf0c64c288db8017aac2e09c2'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'priority'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '35f8e75e046444e68ee16f48c5d5c57d'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '38b1ad3188fd44c88a407fac6372189d'
                        key: {
                            name: 'x_138679_livesecur.user'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3986eed60018457f867674a514eb2d4f'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'artifact_sys_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3a214308719b4121b70cad287f40939a'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'source'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3a5174f9465b4c9fb2b927f7edb1417c'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'advisory_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3ad695302a604ca88d4f30df631a8488'
                        key: {
                            name: 'x_138679_livesecur_sec_task'
                            element: 'finding_ref'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3c83aecea158464cbc585736f86176f6'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'status'
                            value: 'triage'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3f748cea8a044beb83d9d326fe1e2cde'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'error_message'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3f81256059754cb7aa29e77938284235'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'priority'
                            value: 'high'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '418a87f2b09246b0af167ba7035ecfb1'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '41d423ccc01446e6bb5eaaa0a93694df'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'priority'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '42633c5348be4c9fbf55683be7f8aad4'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '43202f2e6d7641a39f46d91737f19784'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '450d129e31de43898bbf60af612cd90c'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'product_list'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '455a6de89298495cbcb1506cefed64cc'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'cve_ids'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '45b229a0ec8a470cabc0b2541481d342'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'priority'
                            value: 'medium'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4609a0bb2774458daf3014f22f54a0bf'
                        key: {
                            sys_security_acl: '7f5dda56d3cb444e9725bc58db274e45'
                            sys_user_role: {
                                id: '38b1ad3188fd44c88a407fac6372189d'
                                key: {
                                    name: 'x_138679_livesecur.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '465ef67fbc594eb691b43bfa3a49e68b'
                        key: {
                            logical_table_name: 'x_138679_livesecur_advisory'
                            col_name_string: 'advisory_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '47ccb2e4477542a1833c7d87329a30b3'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'raw_payload'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4835a08f0a38495591291ab236a595f8'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'raw_payload'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '49f3542473d34297bb450d200e19ada4'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'job_status'
                            value: 'queued'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4a44eb2cad46494380161618f94d53e1'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'detected_on'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '4b220d729bd04038a9681dbd51e66d4b'
                        key: {
                            logical_table_name: 'x_138679_livesecur_advisory'
                            col_name_string: 'published_date'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '4cb403cbde2f4d608c049f79166de88a'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'job_status'
                            value: 'partial'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4d6e684146bc4235b8f8a675d22b3efe'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'started_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4e5262a589d1478d9ef6d58a4f9d38c4'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4edf93d2b3ac4c5aa6c064b5fdb662c3'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'severity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '4ee4d84812bd4a5a9679b658dfa4da27'
                        key: {
                            sys_security_acl: 'e47b4e49fef64cf3ab8a4ccf00f667ca'
                            sys_user_role: {
                                id: '38b1ad3188fd44c88a407fac6372189d'
                                key: {
                                    name: 'x_138679_livesecur.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '50f0e8101ed145298b0e8823e5c488f2'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '523e9c8b42b34e10a6642d806ab042c3'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'severity'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '536a76217e51436381d0f38d8081bf7d'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'risk_score'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '58f73f5acf684497ad2ddd8e49b24612'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '590a4bad660042449de9d75394516e85'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5bdc3495d5974b51bbc733d0747f04ae'
                        key: {
                            name: 'x_138679_livesecur_sec_task'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '610ac08c69df40c481a6fee00c6c1d0a'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'source'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '65209b53fcd14749a777263007e3b504'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'cve_ids'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '65e375cf565e42c99a5261df54fcdc0a'
                        key: {
                            name: 'x_138679_livesecur_sec_task'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '690d81d90c9a43b7a029d0d435d27885'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'advisory_id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '6c8eeb27a08e43a3a5a55d85cc3c19c8'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'priority'
                            value: 'critical'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6cf05d068c5b46dc80f5c74d3ea3910a'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'job_status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6d61c5986efb46629444ae0903b301f5'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'import_state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6e8e4a5f0a82442eb89b710de96af3d3'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'advisory_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '712553ce023443b18d40958cf299a6d3'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'artifact_sys_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: '712a0615e268468daeb4f90fa14e26a2'
                        key: {
                            role: {
                                id: '38b1ad3188fd44c88a407fac6372189d'
                                key: {
                                    name: 'x_138679_livesecur.user'
                                }
                            }
                            contains: {
                                id: 'f5fd15789912420f9a48c21c93b2230f'
                                key: {
                                    name: 'x_138679_livesecur.reader'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '72c56c527dfd4b8dbbe7145e0c5dd43a'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'product_list'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '74681740ee73489f992cc10a1aa655cf'
                        key: {
                            logical_table_name: 'x_138679_livesecur_advisory'
                            col_name_string: 'source'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '74876eded31c4619ad81c943c195f07c'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '74926701c2144030addfccc5eb8b31ea'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '778806c6d9f945159c2c3d83fdee511e'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'job_status'
                            value: 'success'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '79bfe46f36784e6e8c34226d29d55fee'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'severity'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7c240324ee724f72ad648c26711109a0'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: '7e591491a35c467a9cb5c4a01bb107e9'
                        key: {
                            sys_security_acl: 'b4f636e824ab4bb3aff78a9ee8cfd72f'
                            sys_user_role: {
                                id: '38b1ad3188fd44c88a407fac6372189d'
                                key: {
                                    name: 'x_138679_livesecur.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '7e6641b0afe6413aa575ce0a0ce8270c'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'job_status'
                            value: 'failed'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7fc042d9dd85454997279b2a1b244e72'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'raw_payload'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8560c4e651c14928b62a822f83bd17ec'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'error_message'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '899f80facf704799ac99243c54e8342c'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8d7586c2205449dd851b44ed85bd0da9'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'published_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8e6e683ac79e4ea6a99b9aa435d86c75'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'status'
                            value: 'remediated'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8faedf2189cf454784fcfa0d9e592f1f'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'import_state'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9342e60c7f9b44f6bfa6e18688dfb384'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '95a1c2da27ab4a27a4ef40cd5006ea08'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'priority'
                            value: 'low'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '977a349775a9478898f56164af75c2ce'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '97c4965055d54218b06cbcd2bc3e24b6'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9a14c3769ac043f1b7377628074c60b0'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'import_state'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9b52767ae0914eca93888122d2f8bcc0'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'job_status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9cbdfaf92bc04e2f878cc5294dd1cbc9'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'raw_payload'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: '9cddebaefdf4471c8c93a884095d4a21'
                        key: {
                            name: 'x_138679_livesecur.admin'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9d767a2d7ffc4623a9f86b6662cf828d'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'raw_payload'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '9f45cdc07c4449518fb2777745fafea6'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9f838a255dc448f1bd1232ce6ba641b6'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'finished_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: '9fec94f509754930a8293c1b7783af82'
                        key: {
                            logical_table_name: 'x_138679_livesecur_finding'
                            col_name_string: 'artifact_sys_id'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a35784ab5a5c487d97e4007fcd3ee399'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'risk_score'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'aad2a1303bbd492c9692871e6419bb56'
                        key: {
                            logical_table_name: 'x_138679_livesecur_scan_job'
                            col_name_string: 'started_at'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ace119e77b69479fb2f200e9826a5a1b'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'source'
                            value: 'servicenow'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ad3932a095b2449dad6df4e6e2ea0a9a'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'cve_ids'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b09ebacd4824433bac347b8ab57aacf2'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'remediation_text'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'b0afd0f82f634565af27bdf2d1759d27'
                        key: {
                            logical_table_name: 'x_138679_livesecur_finding'
                            col_name_string: 'priority'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b2be9150019f4db79fc759a22ce258d1'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'published_date'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'b34cd5bd96094079b901710c539d58b2'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b5b66588be914f1884bec0c483c8befb'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'started_at'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b5bbdb2b65434c7193e0679f126c5b45'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'status'
                            value: 'accepted'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b708a417fc2a47bcb91f065e034c37d4'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'description'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b718a2b1bf2b416f96812a5e264c0d6d'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b7d1f504615b42728273acd6680e12ed'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'published_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b7f92fb2971c4c598cf41434d801083d'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'severity'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b82915b09f1547d5aadb5edda301e763'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'source'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'b879320dd6564556ad0a217d9c70a0be'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'severity'
                            value: 'medium'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b9426927d75340f19bdb757a5f80d588'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'description'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b9ebcacdd81246438a5cade7f5f678ce'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'product_list'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bb36a6f5f13b45af8dcf2621a54bf708'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'advisory_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bc29c87d795b4bdca0be430a407e3cf3'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'import_state'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bdcbb0e9b53e4701a06364379160a83e'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'remediation_text'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bf24c7e2ab714dbc8422f9096dba190d'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'finished_at'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c31864f68cfd4c04b2080555f6484fc4'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c3eb0178370c40468c73a754bc36e54d'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'published_date'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c40a66298c2140a7a323c8cc1aa74576'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'status'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c42be17a93d4412784123e649466b142'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'c87c1b2801d04502aa54465771d0f78b'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'c8e5616a20234e70b01ce57b43900471'
                        key: {
                            sys_security_acl: '52c46bfc65d44e4489ad65834ec4ad9d'
                            sys_user_role: {
                                id: '9cddebaefdf4471c8c93a884095d4a21'
                                key: {
                                    name: 'x_138679_livesecur.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cb3753623ab946fa885f2595f34befe6'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'raw_payload'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'ce0d9d1c6d33442e865a7d1119385a3d'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'severity'
                            value: 'critical'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cf5c115589b24c09a7f1256f34589a94'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'title'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd14984da229942c6a77208467759d27d'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'scheduled_by'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'd600b8cc11184ae78b40b24c25045a3b'
                        key: {
                            sys_security_acl: '36c2429916bd4d32a248bee717302696'
                            sys_user_role: {
                                id: '9cddebaefdf4471c8c93a884095d4a21'
                                key: {
                                    name: 'x_138679_livesecur.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'd63cb8b9c65442588c258f77e09952cf'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd776afacc97740c582e15c77f23d98e7'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'error_message'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'd991646173974c8eb569fb5d646ab0e8'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd9c25c1dc75749ac96eca579377728cf'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'source'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'dd09cbb670ec48339f125aa08b141fe0'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ddf659af93a941a08b9517339ecb0957'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e09fddd50ae940beb8eb89fb0df54c5d'
                        key: {
                            sys_security_acl: '2e2a9fdba0b34464be1513d29680063a'
                            sys_user_role: {
                                id: '9cddebaefdf4471c8c93a884095d4a21'
                                key: {
                                    name: 'x_138679_livesecur.admin'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'e165e6f728334d10844a45e0b49438dc'
                        key: {
                            sys_security_acl: '047a9e3ae4f44ce6ba0f98b349a44055'
                            sys_user_role: {
                                id: '38b1ad3188fd44c88a407fac6372189d'
                                key: {
                                    name: 'x_138679_livesecur.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_index'
                        id: 'e21c83f40b5244a1b340652f5df576d7'
                        key: {
                            logical_table_name: 'x_138679_livesecur_finding'
                            col_name_string: 'status'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e26baf6d5e4d4d528be2dc53f6847cad'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'title'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e4313865a38741b89beab8d947791cf4'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'severity'
                            value: 'high'
                        }
                    },
                    {
                        table: 'sys_user_role_contains'
                        id: 'e44089a8c5d34fe3978eef4d7d5bb350'
                        key: {
                            role: {
                                id: '9cddebaefdf4471c8c93a884095d4a21'
                                key: {
                                    name: 'x_138679_livesecur.admin'
                                }
                            }
                            contains: {
                                id: '38b1ad3188fd44c88a407fac6372189d'
                                key: {
                                    name: 'x_138679_livesecur.user'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e4ab3f7afeb14886a4edd2282c90b108'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'status'
                            value: 'new'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e69c68b099c6458caa3a9dd1eec3d4fc'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'detected_on'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'e713fd276c084cc0945b2ae782f80477'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'severity'
                            value: 'unknown'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e9d297d5207247d0941621cdd2a0879a'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'scheduled_by'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'ea1a93e1df4c40909384b25afab27088'
                        key: {
                            name: 'x_138679_livesecur_finding'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ea1b5798dc704400a01ff68b94419a48'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'source'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ec3ad09fa3da4548ab5dcf2a9b73a2ce'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'advisory_id'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ed4b528e06a144b88cdf82e0d4e80674'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'product_list'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'ef323bb8edee454697eca46c6104e2ad'
                        key: {
                            name: 'x_138679_livesecur_finding'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f530c7b546164e31998957cefde74718'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_servicenow'
                            element: 'advisory_id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_user_role'
                        id: 'f5fd15789912420f9a48c21c93b2230f'
                        key: {
                            name: 'x_138679_livesecur.reader'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f8b15bd0cd584b14b4a535f72ef5276e'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'match_confidence'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f8e40f0d403e4426964dbfd43ccbc250'
                        key: {
                            name: 'x_138679_livesecur_finding'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f9bb5d8f3f674656a5bae0447d139c98'
                        key: {
                            name: 'x_138679_livesecur_sec_task'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fa2cf88646644910aa3ded6cd279d93e'
                        key: {
                            name: 'x_138679_livesecur_scan_job'
                            element: 'job_status'
                            value: 'running'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fc9cb63d2a98496bacfe3106a376407f'
                        key: {
                            name: 'x_138679_livesecur_advisory'
                            element: 'cve_ids'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fcde1c13320746a0aab4c14ab16b75c7'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'product_list'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_security_acl_role'
                        id: 'fe6f78986b1d44bc8ed1b1e06a399b0c'
                        key: {
                            sys_security_acl: '563220b766e04b42b130f094af2a2ffb'
                            sys_user_role: {
                                id: 'f5fd15789912420f9a48c21c93b2230f'
                                key: {
                                    name: 'x_138679_livesecur.reader'
                                }
                            }
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fef7bdf2564d42d9b1956413830d1071'
                        key: {
                            name: 'x_138679_livesecur_advisory_is_nvd'
                            element: 'published_date'
                        }
                    },
                ]
            }
        }
    }
}
