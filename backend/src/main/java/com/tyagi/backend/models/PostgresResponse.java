package com.tyagi.backend.models;

import java.util.List;




public class PostgresResponse {
    
    private int statusCode;
    private String message;
    private boolean success;
    private List<Object> results;

    public PostgresResponse(){}

    public PostgresResponse(int statusCode, String message, boolean success, List<Object> results){
        this.statusCode = statusCode;
        this.message = message;
        this.success = success;
        this.results = results;
    }

	public int getStatusCode() {
		return this.statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isSuccess() {
		return this.success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public List<Object> getResults() {
		return this.results;
	}

	public void setResults(List<Object> results) {
		this.results = results;
	}

}
