package com.tyagi.backend.utils;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import org.springframework.stereotype.Component;

@Component
public class BackendUtils {
    
    public ObjectNode getRequestNodes(String request) throws JsonParseException, JsonMappingException, IOException{
        ObjectMapper mapper = new ObjectMapper();
        Reader reader = new StringReader(request);
        ObjectNode nodes = mapper.readValue(reader, ObjectNode.class);
        return nodes;
    }
}
